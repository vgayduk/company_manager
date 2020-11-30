import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser  from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();
  // app.use(bodyParser.json());
  await app.listen(8080);
}
bootstrap();
