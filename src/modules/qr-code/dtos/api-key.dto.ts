import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApiKeyDto {
  @ApiProperty({
    description: 'The API key to be used for authentication or identification',
    example: '6bd9923a-0fd9-4981-8623-03d9fffb0c90',
  })
  @IsNotEmpty({ message: 'API key cannot be empty' })
  @IsString({ message: 'API key must be a string' })
  @Transform(({ value }) => value.toLowerCase())
  apiKey: string;
}
