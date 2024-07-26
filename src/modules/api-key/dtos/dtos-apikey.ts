import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationApikeyDto {
  @ApiProperty({
    name: 'apiKey',
    type: String,
    required: true,
    isArray: false,
    description: 'The API key to be used for authentication or identification',
    example: '9eyooba1s8xz5vopu5l8',
  })
  @IsNotEmpty({ message: 'API key cannot be empty' })
  @IsString({ message: 'API key must be a string' })
  apiKey: string;
}
