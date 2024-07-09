import { Module } from '@nestjs/common';
import { ApiKeyAuthService } from './apikey.service';
import { ApiKeyAuthController } from './apikey.controller';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [ApiKeyAuthController],
  providers: [ApiKeyAuthService],
})
export class ApikeyModule {}
