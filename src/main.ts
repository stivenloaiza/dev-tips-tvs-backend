import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  
  app.setGlobalPrefix('/v1/api');
  console.log(`Running app on :http://localhost:${port}/v1/api`);

  await app.listen(port);
}
bootstrap();