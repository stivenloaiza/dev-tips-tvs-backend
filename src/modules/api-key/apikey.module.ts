import { Module } from '@nestjs/common';
import { ApiKeyAuthController } from './controllers/apikey.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiKeyAuthService } from './services/apikey.service';
import { AuthenticationApikeyDto } from './dtos/dtos-apikey';


@Module({
  imports: [ HttpModule],
  controllers: [ApiKeyAuthController],
  providers: [
    ApiKeyAuthService,
    AuthenticationApikeyDto
  ],
  exports: [ApiKeyAuthService],
})
export class ApikeyModule { }
