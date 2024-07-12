import { Module } from '@nestjs/common';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { ApikeyModule } from './modules/api-key/apikey.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import db_config from './modules/persistence/db-config';
import { HttpModule } from '@nestjs/axios';
import { MockTipsModule } from './mocks/mock-tips/mock-tips.module';
import { MockModule } from './mocks/mock-user/mock.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load:  [db_config],
      isGlobal: true,
    }),
    HttpModule,
    PersistenceModule,
    QrCodeModule,
    ApikeyModule,
    MockTipsModule,
    MockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
