import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {AllExceptionsFilter} from './http-exception/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT ||3001;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
