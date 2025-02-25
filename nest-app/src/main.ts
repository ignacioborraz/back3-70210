import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(morgan('dev'));
  const env = new ConfigService();
  const port: number = env.get('PORT') ?? 8080;
  await app.listen(port);
  console.log('server ready on port ' + port);
}
bootstrap();
