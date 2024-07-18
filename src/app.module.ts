import { Module } from '@nestjs/common';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { ApikeyModule } from './modules/api-key/apikey.module';
import { QrCodeModule } from './modules/qr-code/qr-code.module';
import db_config from './modules/persistence/db-config';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),
    HttpModule,
    PersistenceModule,
    QrCodeModule,
    ApikeyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
