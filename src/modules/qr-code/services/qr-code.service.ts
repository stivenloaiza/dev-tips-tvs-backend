import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { QrCode } from '../entities/qr-code.entity';
import { Model } from 'mongoose';
import { VerificationCode } from '../entities/verification-codes.entity';
import * as crypto from 'crypto';
import { VerificationCodeGenerated } from '../interfaces/verification-code.interface';
import axios from 'axios';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectModel(QrCode.name) private qrCodeModel: Model<QrCode>,
    @InjectModel(VerificationCode.name)
    private verificationCode: Model<VerificationCode>,
  ) {}

  async generateQrCode(): Promise<{ code: string; url: string }> {
    const code = uuidv4();
    const url = `http://localhost:3000/qr-code/${code}`;
    const createdAt = new Date();

    const qrCode = new this.qrCodeModel({
      code: code,
      url: url,
      isAuthenticated: false,
      createdAt: createdAt,
    });
    await qrCode.save();
    return { code, url };
  }

  async verifyQrCode(code: string): Promise<boolean> {
    const qrCode = await this.qrCodeModel.findOne({ code: code }).exec();
    if (qrCode) {
      qrCode.isAuthenticated = true;
      await qrCode.save();
      return true;
    }
    return false;
  }

  async checkAuthentication(code: string): Promise<boolean> {
    const qrCode = await this.qrCodeModel.findOne({ code: code }).exec();
    return qrCode ? qrCode.isAuthenticated : false;
  }

  async userExists(email: string): Promise<boolean> {
    const response = await axios.get(
      `${process.env.USER_URL}/users/findByEmail/${email}`,
    );
    console.log(response);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }

  async generateVerificationCode(
    email: string,
  ): Promise<VerificationCodeGenerated> {
    if (await this.userExists(email)) {
      const code = crypto.randomBytes(3).toString('hex');
      const codeGenerated = {
        email: email,
        used: false,
        code: code,
        createdAt: new Date(),
        expiredAt: new Date(new Date().getTime() + 15 * 60000),
      };
      const verificationCode = new this.verificationCode(codeGenerated);
      await verificationCode.save();
      return codeGenerated;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async isValidCode(code: string): Promise<boolean> {
    const findCode = await this.verificationCode.findOne({ code: code }).exec();
    if (!findCode) {
      throw new NotFoundException('Code not found');
    }

    if (findCode.used === true) {
      throw new NotFoundException('Code already used');
    }

    if (findCode.expiredAt < new Date()) {
      throw new NotFoundException('Code expired');
    }

    return true;
  }

  async sendEmail(email: string) {
    const codeFound = await this.generateVerificationCode(email);
    try {
      const response = await axios.post(process.env.CRONJOBS_URL, {
        code: codeFound.code,
        email: email,
      });
      return response.data;
    } catch (error) {
      throw new NotFoundException('Error sending email');
    }
  }

  async isCodeMatch(code: string) {
    try {
      if (await this.isValidCode(code)) {
        const findCode = await this.verificationCode
          .findOne({ code: code })
          .exec();
        findCode.used = true;
        await findCode.save();
        return { isCodeMatch: true, email: findCode.email };
      }
      return { isCodeMatch: false };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserSubscriptions(code: string) {
    const { isCodeMatch, email } = await this.isCodeMatch(code);
    if (isCodeMatch && email) {
      try {
        const response = await axios.get(
          `${process.env.USER_URL}/users/findByEmail/${email}`,
        );
        const user = response.data;
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const tvSubscriptions = user.subscriptions.filter(
          (sub) => sub.type === 'tv',
        );
        return { name: user.name, subscriptions: tvSubscriptions };
      } catch (error) {
        throw new HttpException(
          error.response?.data || 'Error fetching user data',
          error.response?.status || 500,
        );
      }
    } else {
      throw new NotFoundException('Invalid code');
    }
  }
}
