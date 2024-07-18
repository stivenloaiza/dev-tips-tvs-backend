import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description:
      'The email address of the user. This must be a valid email format and will be converted to lowercase.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
