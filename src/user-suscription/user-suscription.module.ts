import { Module } from '@nestjs/common';
import { UserSuscriptionService } from './user-suscription.service';
import { UserSubscriptionsController } from './user-suscription.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserSubscriptionsController],
  providers: [UserSuscriptionService],
})
export class UserSuscriptionModule {}
