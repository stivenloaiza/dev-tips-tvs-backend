// src/auth/auth.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiKeyAuthService } from './apikey.service';

@Controller('auth')
export class ApiKeyAuthController {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  @Get('validate')
  async validateApiKey(@Query('apiKey') apiKey: string) {
    const user = await this.apiKeyAuthService.validateApiKey(apiKey);
    return user;
  }
}
