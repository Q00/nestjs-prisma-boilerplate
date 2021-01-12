import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve, join } from 'path';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';

config({ path: resolve(__dirname, `../.env.${process.env.NODE_ENV}`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const swaggerOptions = new DocumentBuilder()
    .setTitle('API Swagger')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addServer(process.env.NODE_ENV === 'dev' ? 'http://' : 'https://')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/api/docs', app, swaggerDoc, {
    swaggerUrl: `/api/docs-json`,
    explorer: true,
    // swaggerOptions: {
    //   docExpansion: 'list',
    //   filter: true,
    //   showRequestDuration: true,
    // },
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(express.static(join(process.cwd(), '../client/dist/')));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
