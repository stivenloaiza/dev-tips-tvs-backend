import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import db_config from './persistence/db_config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load:[db_config],
      isGlobal: true,
    }),

    PersistenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
