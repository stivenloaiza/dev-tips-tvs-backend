import { Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class apikey extends Document {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  apikey: string;
}
