import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class  AuthenticationApikeyDto {
    @ApiProperty({
        name: 'apikey',
        type: String,
        required: true,
        isArray: false,
        description: 'The API key to be used for authentication or identification',
        example: '6bd9923a-0fd9-4981-8623-03d9fffb0c90',
    })
        
      @IsNotEmpty({ message: 'API key cannot be empty' })
      @IsString({ message: 'API key must be a string' })
      apiKey: string;
    }
