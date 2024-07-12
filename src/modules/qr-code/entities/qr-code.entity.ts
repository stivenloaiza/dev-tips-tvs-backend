import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class QrCode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: false })
  isAuthenticated: boolean;

  @Prop({ required: true })
  createdAt: Date;
}

export const QRCodeSchema = SchemaFactory.createForClass(QrCode);
