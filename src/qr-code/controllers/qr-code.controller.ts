import { Controller, Get, Param, Query } from '@nestjs/common';
import { QrCodeService } from '../services/qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get('generate-qr')
  async generateQr() {
    return await this.qrCodeService.generateQrCode();
  }

  @Get('verify-qr')
  async verifyQr(@Query('code') code: string) {
    const isVerified = await this.qrCodeService.verifyQrCode(code);
    return { verified: isVerified };
  }

  @Get('check/:code')
  async checkAuthentication(@Param('code') code: string) {
    const isAuthenticated = await this.qrCodeService.checkAuthentication(code);
    return { authenticated: isAuthenticated };
  }
}
