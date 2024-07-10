import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('TV´s Tips')
    .setDescription(
      'The "Programming Tips" project is a solution that allows companies to display brief and concise programming tips in various languages and experience levels on television screens. Each QR contains user authentication to show information based on their subscription. This API allows companies to retrieve programming tips based on the desired language and experience level and display them on television screens within their facilities. The QR code accesses more detailed information on an external webpage. Daniel Lopez, Manuela Giraldo, Samuel Vera, Alexander Hernandez.',
    )
    .setVersion('1.0')
    .addTag('TV´s tips')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(port);

  console.log(`Running app on :http://localhost:${port}/v1/api`);
  console.log(`Access to the project via Swagger: localhost:${port}/api/doc`);
}
bootstrap();
