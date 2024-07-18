import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbconfig from './db-config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbconfig>) => {
        const { db } = configService;
        const uriDb = `mongodb+srv://${db.user}:${db.password}@${db.cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Tvs`;
        return {
          uri: uriDb,
        };
      },
      inject: [dbconfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
