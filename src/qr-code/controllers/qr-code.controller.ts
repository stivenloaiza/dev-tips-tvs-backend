import { Controller, Get } from '@nestjs/common';
import { QrCodeService } from '../services/qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get('generate-qr')
  async generateQr() {
    const qrCodeDataUrl = await this.qrCodeService.generateQrCode();
    return { qrCodeDataUrl };
  }
}
