import { Module } from '@nestjs/common';
import { QrCodeController } from './controllers/qr-code.controller';
import { QrCodeService } from './services/qr-code.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QrCode, QRCodeSchema } from './entities/qr-code.entity';
import {
  VerificationCode,
  VerificationCodeSchema,
} from './entities/verification-codes.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QrCode.name, schema: QRCodeSchema },
      { name: VerificationCode.name, schema: VerificationCodeSchema },
    ]),
  ],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}
