import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

const PORT = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json());

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    exposedHeaders: ['resource-id'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || PORT, () =>
    console.log(`Listening on port ${process.env.PORT || PORT}`),
  );
}
bootstrap();
