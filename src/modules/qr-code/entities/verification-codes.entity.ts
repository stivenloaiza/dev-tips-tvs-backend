import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class VerificationCode {
  @Prop({ required: true, type: String, index: true })
  email: string;

  @Prop({ required: true, type: Boolean })
  used: boolean;

  @Prop({ required: true, type: String, index: true })
  code: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: false, type: Date, default: null })
  expiredAt: Date;
}

export const VerificationCodeSchema =
  SchemaFactory.createForClass(VerificationCode);
