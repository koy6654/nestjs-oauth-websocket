import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ChatModule } from 'src/chat/chat.module';
import configUtil from './utils/config';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

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
        ConfigModule.forRoot({
            load: [configUtil],
            isGlobal: true,
        }),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgresql',
                dbName: configService.get("database.name"),
                host: configService.get("database.host"),
                port: configService.get("database.port"),
                user: configService.get("database.user"),
                password: configService.get("database.password"),
                entities: ['./dist/entities'],
                entitiesTs: ['./src/entities'],
            }),
        }),
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (configService: ConfigService) => ({
        //         type: 'postgres',
        //         host: configService.get<string>('database.host'),
        //         port: Number(configService.get<string>('database.port')),
        //         username: configService.get<string>('database.username'),
        //         password: configService.get<string>('database.password'),
        //         database: configService.get<string>('database.database'),
        //         synchronize: true,
        //     }),
        //     inject: [ConfigService],
        // }),
        ChatModule,
        UserModule,
    ],
    providers: [Commander],
})
export class AppModule {}
