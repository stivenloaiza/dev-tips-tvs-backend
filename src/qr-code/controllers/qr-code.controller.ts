import { Controller, Get, Param, Query } from '@nestjs/common';
import { QrCodeService } from '../services/qr-code.service';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @ApiOperation({ summary: 'Generate URL of QR code' })
  @Get('generate-qr')
  async generateQr() {
    return await this.qrCodeService.generateQrCode();
  }

  @ApiOperation({ summary: 'Verify URL' })
  @ApiQuery({
    name: 'code',
    required: true,
    description: 'Unique identification code for verify the URL of the QR code',
    type: String,
    example: '6bd9923a-0fd9-4981-8623-03d9fffb0c90',
  })
  @Get('verify-qr')
  async verifyQr(@Query('code') code: string) {
    const isVerified = await this.qrCodeService.verifyQrCode(code);
    return { verified: isVerified };
  }

  @ApiOperation({ summary: 'Check authentication property' })
  @ApiParam({
    name: 'code',
    description: 'Unique identification code for the URL of the QR code',
  })
  @Get('check/:code')
  async checkAuthentication(@Param('code') code: string) {
    const isAuthenticated = await this.qrCodeService.checkAuthentication(code);
    return { authenticated: isAuthenticated };
  }

  @ApiOperation({ summary: 'Validate if user exists by email' })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email to validate',
    type: String,
    example: 'bob@example.com',
  })
  @Get('user-exists')
  async userExists(@Query('email') email: string) {
    return this.qrCodeService.userExists(email);
  }

  @Get('generate-code/:email')
  async generateVerificationCode(@Param('email') email: string) {
    return await this.qrCodeService.generateVerificationCode(email);
  }
}
