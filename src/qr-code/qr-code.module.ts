import { Module } from '@nestjs/common';
import { QrCodeController } from './controllers/qr-code.controller';
import { QrCodeService } from './services/qr-code.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QrCode, QRCodeSchema } from './entities/qr-code.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QrCode.name, schema: QRCodeSchema }]),
  ],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}
