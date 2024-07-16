import { Controller, Get, Query } from '@nestjs/common';
import { MockTipsService } from './mock-tips.service';

@Controller('mock-tips')
export class MockTipsController {
  constructor(private readonly mockTipsService: MockTipsService) {}

    @Get('tips')
    async getTip(
      @Query('level') seniority: string,
      @Query('technology') technology: string,
    ): Promise<{ body: string; title: string }> {
      return await this.mockTipsService.getTips(seniority, technology);
    }

}
