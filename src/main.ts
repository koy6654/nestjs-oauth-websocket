// import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';

async function koyChat() {
    // const app = await NestFactory.create(AppModule);
    // const configService = app.get(ConfigService);
    // const port = configService.get<string>('server.port');

    await CommandFactory.run(AppModule, ['warn', 'error']);

    // await app.listen('3000');
}
koyChat();
