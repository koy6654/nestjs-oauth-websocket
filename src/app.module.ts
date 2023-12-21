import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

interface BasicCommandOptions {
    path?: string;
}

@Command({ name: 'koy-chat commander' })
class Commander extends CommandRunner {
    constructor() {
        super();
    }
    
    private logger: Logger = new Logger();

    async run(
        passedParams: string[],
        options?: BasicCommandOptions,
    ): Promise<void> {
        this.logger.log(passedParams);
        this.logger.log(options.path);
    }

    @Option({
        flags: '-c, --config [path]',
        description: 'Get config yml',
    })
    getConfigPath(value: string): string {
        return value;
    }
}

@Module({
    imports: [
        // ConfigModule.forRoot({
        //     load: [configUtil],
        //     isGlobal: true,
        // }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
            validationSchema: {
                JWT_SECRET: process.env.JWT_SECRET,
                JWT_EXPIRATION_TIME: '30',
            }
        }),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            useFactory: () => ({
                type: 'postgresql',
                driver: PostgreSqlDriver,
                dbName: process.env.DATABASE_DATABASE,
                host:  process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
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
