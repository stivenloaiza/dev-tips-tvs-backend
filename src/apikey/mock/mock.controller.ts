import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('subscriptions')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('sub')
  async getSuscriptionByApiKey(@Query('apiKey') apiKey: string) {
    try {
      const subscription = await this.mockService.getSubByApiKey(apiKey);
      if (!subscription) {
        throw new NotFoundException(
          `Subscription not found for apiKey: ${apiKey}`,
        );
      }
      return subscription;
    } catch (error) {
      throw new NotFoundException(
        `Subscription not found for apiKey: ${apiKey}`,
      );
    }
  }
}
