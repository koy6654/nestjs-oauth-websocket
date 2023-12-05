import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ChatModule } from 'src/chat/chat.module';
import configUtil from './utils/config';
import { UserModule } from './user/user.module';

interface BasicCommandOptions {
    path?: string;
}

@Command({ name: 'koy-chat commander' })
class Commander extends CommandRunner {
    constructor() {
        super();
    }

    async run(
        passedParams: string[],
        options?: BasicCommandOptions,
    ): Promise<void> {
        console.log(passedParams);
        console.log(options.path);
    }

    @Option({
        flags: '-c, --config [path]',
        description: 'Get config yml',
    })
    getConfigPath(value: string): string {
        console.log(value);
        return value;
    }
}

@Module({
    imports: [
        // const configService = app.get(ConfigService);
        // const port = configService.get<string>('server.port');

        // TypeOrmModule.forRoot({
        // type: 'postgres',
        // host: 'localhost',
        // port: 5432,
        // username: 'postgres',
        // password: 'simform',
        // database: 'pgWithNest',
        // synchronize: true,
        // }),
        ConfigModule.forRoot({
            load: [configUtil],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: Number(configService.get<string>('database.port')),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        ChatModule,
        UserModule,
    ],
    providers: [Commander],
})
export class AppModule {}
