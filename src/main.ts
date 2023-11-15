import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function koyChat() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
koyChat();
