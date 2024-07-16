import { Module } from '@nestjs/common';
import { ApiKeyAuthController } from './controllers/apikey.controller';
import { AxiosModule } from '../axios/axios.module';
import { HttpModule } from '@nestjs/axios';
import { MockModule } from '../../mocks/mock-user/mock.module';
import { ApiKeyAuthService } from './services/apikey.service';
import { AuthenticationApikeyDto } from './dtos/dtos-apikey';

@Module({
  imports: [AxiosModule, MockModule, HttpModule],
  controllers: [ApiKeyAuthController],
  providers: [
    ApiKeyAuthService,
    AuthenticationApikeyDto
  ],
  exports: [ApiKeyAuthService],
})
export class ApikeyModule {}
