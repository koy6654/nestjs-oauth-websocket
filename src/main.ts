import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function koyChat() {
    const logger = new Logger();

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<string>('server.port');

    app.useWebSocketAdapter(new WsAdapter(app));

    await app.listen(port);
    logger.log(`Server listen ${port}`);
}
koyChat();
