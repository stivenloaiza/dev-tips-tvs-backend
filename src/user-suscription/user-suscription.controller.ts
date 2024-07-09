import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { UserSuscriptionService } from './user-suscription.service';
import { get } from 'http';

@Controller('subscriptions')
export class UserSubscriptionsController {
  constructor(private readonly userService: UserSuscriptionService) {}

  @Get('/:email/subscriptions')
  getUserSubscriptions(@Param('email') email: string) {
    const subscriptions = this.userService.getUserSubscriptions(email);
    if (subscriptions) {
      return { subscriptions };
    } else {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  @Get('/:email')
  getUserInfo(@Param('email') email: string) {
   const user = this.userService.getUserInfo(email);
   if (user) {
     return { user };
   } else {
     throw new NotFoundException(`User with email ${email} not found`);
   }
   }
}
