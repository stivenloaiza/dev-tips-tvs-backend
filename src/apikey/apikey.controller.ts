import { Controller, Get, Query } from '@nestjs/common';
import { ApiKeyAuthService } from './apikey.service';

@Controller('auth')
export class ApiKeyAuthController {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  @Get('validate-apikey')
  async validateApiKey(@Query('apiKey') apiKey: string) {
    return this.apiKeyAuthService.validateApiKey(apiKey);
  }
}
