import { Injectable } from '@nestjs/common';
import * as QrCodeLib from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { QrCode } from '../entities/qr-code.entity';
import { Model } from 'mongoose';

@Injectable()
export class QrCodeService {
  constructor(@InjectModel(QrCode.name) private qrCodeModel: Model<QrCode>) {}

  async generateQrCode(): Promise<string> {
    const uniqueId = uuidv4();
    const url = `http://localhost:3000/qr-code/${uniqueId}`;
    const qrCodeDataUrl = await QrCodeLib.toDataUrl(url);

    const newQrCode = new this.qrCodeModel({
      code: uniqueId,
      url: url,
      createdAt: new Date(),
    });
    await newQrCode.save();
    return qrCodeDataUrl;
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
}
