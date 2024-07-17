import { Controller, Get, Query } from '@nestjs/common';
import { ApiKeyAuthService } from '../services/apikey.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationApikeyDto } from '../dtos/dtos-apikey';

@ApiTags('Api Key')
@Controller('auth')
export class ApiKeyAuthController {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  @ApiParam({
    name: 'apiKey',
    type: 'string',
    required: true,
    description: 'The apikey of the tip to be found.',
    examples: {
      example1: {
        value: 'xyz7890abcde2',
      },
    },
  })
  @ApiOperation({
    summary: 'Find the susbcription by apikey of the system.',
    description: 'View a specific tip registered in the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('validate-apikey')
  async validateApiKey(@Query() apikeyDto: AuthenticationApikeyDto) {
    const valid = await this.apiKeyAuthService.startByApiKey(apikeyDto.apiKey);
    if (valid) {
      return {
        message: 'API Key is valid',
        data: valid,
      };
    } else {
      return {
        message: 'API Key is invalid',
      };
    }
  }
}

//startByApiKey
