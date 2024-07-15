import { Controller, Get, Query } from '@nestjs/common';
import { ApiKeyAuthService } from '../services/apikey.service';

@Controller('auth')
export class ApiKeyAuthController {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) { }

  @Get('validate-apikey')
  async validateApiKey(@Query('apiKey') apiKey: string) {
    const isValid = await this.apiKeyAuthService.startByApiKey(apiKey);
    if (isValid) {
      return { message: 'API Key is valid' };
    } else {
      return { message: 'API Key is invalid' };
    }
  }
}

