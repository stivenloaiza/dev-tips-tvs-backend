import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class CodeDto {
  @ApiProperty({
    description: 'Unique 6-digit hexadecimal verification code',
    example: '1a2b3c',
  })
  @IsString({ message: 'Code must be a string' })
  @Matches(/^[0-9a-fA-F]{6}$/, {
    message: 'Code must be exactly 6 hexadecimal digits',
  })
  @Transform(({ value }) => value.toLowerCase())
  code: string;
}
