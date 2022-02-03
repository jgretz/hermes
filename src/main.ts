// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {enforceKeyMiddleware} from './middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(enforceKeyMiddleware);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
