import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class QrCode {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: false })
  isAuthenticated: boolean;

  @Prop({ required: true })
  createdAt: Date;
}
