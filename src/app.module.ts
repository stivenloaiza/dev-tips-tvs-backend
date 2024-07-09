import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { QrCodeModule } from './qr-code/qr-code.module';
import db_config from './persistence/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),

    PersistenceModule,
    QrCodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
