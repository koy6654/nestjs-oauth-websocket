import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function koyChat() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<string>('server.port');

    await app.listen(port);
    console.log(`Server listen ${port}`);
}
koyChat();
