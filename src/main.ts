import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function koyChat() {
    const logger = new Logger();

    const app = await NestFactory.create(AppModule);

    // Websocket
    app.useWebSocketAdapter(new WsAdapter(app));

    // Cookie
    app.use(cookieParser());

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }),
    );

    const port = process.env.SERVER_PORT;
    await app.listen(port);
    logger.log(`Server listen ${port}`);
}
koyChat();
