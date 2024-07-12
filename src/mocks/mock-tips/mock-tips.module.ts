import { Module } from '@nestjs/common';
import { MockTipsService } from './mock-tips.service';
import { MockTipsController } from './mock-tips.controller';

@Module({
  controllers: [MockTipsController],
  providers: [MockTipsService],
})
export class MockTipsModule {}
