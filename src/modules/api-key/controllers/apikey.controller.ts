import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiKeyAuthService } from '../services/apikey.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationApikeyDto } from '../dtos/dtos-apikey';

@ApiTags('Api Key')
@Controller('auth')
export class ApiKeyAuthController {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  @ApiOperation({
    summary: 'Find the susbcription by apikey of the system.',
    description: 'View a specific tip registered in the database.',
  })
  @ApiResponse({ status: 200, description: 'API Key is valid' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('validate-apikey')
  @HttpCode(HttpStatus.OK)
  async validateApiKey(@Query() apikeyDto: AuthenticationApikeyDto) {
    const valid = await this.apiKeyAuthService.startByApiKey(apikeyDto.apiKey);
    if (valid) {
      return {
        message: 'API Key is valid',
        data: valid,
      };
    } else {
      throw new HttpException(
        {
          message: 'API Key is invalid',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
