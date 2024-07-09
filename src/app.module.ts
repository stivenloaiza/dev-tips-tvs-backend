import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { ApikeyModule } from './apikey/apikey.module';
import db_config from './persistence/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load:[db_config],
      isGlobal: true,
    }),

    PersistenceModule,

    ApikeyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
