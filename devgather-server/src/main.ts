import * as express from 'express';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { ExpressAdapter } from '@nestjs/platform-express';
import { prisma } from './@shared/db';
import { auth } from './@shared/auth';

async function bootstrap() {
  const adapter = express();

  adapter.use(
    cors({
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );
  adapter.all('/api/auth/*', toNodeHandler(auth));

  const app = await NestFactory.create(
    AppModule.register(prisma),
    new ExpressAdapter(adapter),
    { cors: true },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
