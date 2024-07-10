import { Module } from '@nestjs/common';
import { ApiKeyAuthService } from './apikey.service';
import { ApiKeyAuthController } from './apikey.controller';
import { AxiosModule } from './axios/axios.module';
import { MockModule } from './mock/mock.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AxiosModule,
    MockModule,
    HttpModule
    ],
  controllers: [ApiKeyAuthController],
  providers: [ApiKeyAuthService],
})
export class ApikeyModule {}
