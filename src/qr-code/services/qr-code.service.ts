import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { QrCode } from '../entities/qr-code.entity';
import { Model } from 'mongoose';
import { VerificationCode } from '../entities/verification-codes.entity';
import * as crypto from 'crypto';

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

  async userExists(email: string): Promise<Boolean> {
    // JSON burned to simulate email validation
    const users = [
      {
        apiKey: 'xyz7890abcdef',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '1987654321',
        role: 'company',
        managerName: 'Jane Doe',
        managerEmail: 'jane.doe@example.com',
        managerPhone: '+1122334455',
        subscriptions: 'TvMedia',
      },
      {
        apiKey: 'xyz7890abcde2',
        name: 'Steve Smith',
        email: 'steve@example.com',
        phone: '3524154863',
        role: 'company',
        managerName: 'Jane Doe',
        managerEmail: 'jane.doe@example.com',
        managerPhone: '+1122334455',
        subscriptions: 'TvMedia',
      },
    ];
    return users.some((user) => user.email === email);
  }

  async generateVerificationCode(email: string): Promise<Object> {
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
}
