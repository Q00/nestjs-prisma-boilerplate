console.log('hello no');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve, join } from 'path';
import * as express from 'express';

config({ path: resolve(__dirname, `../${process.env.NODE_ENV}.env`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(join(process.cwd(), '../client/dist/')));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
