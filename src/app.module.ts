import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import db_config from './persistence/db-config';
import { HttpModule } from '@nestjs/axios';
import { UserSuscriptionModule } from './user-suscription/user-suscription.module';
import { UserSubscriptionsController } from './user-suscription/user-suscription.controller';
import { UserSuscriptionService } from './user-suscription/user-suscription.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),

    HttpModule,
    PersistenceModule,
    UserSuscriptionModule,
  ],
  controllers: [UserSubscriptionsController],
  providers: [UserSuscriptionService],
})
export class AppModule {}
