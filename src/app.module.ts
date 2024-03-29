import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Command, CommandRunner, Option } from 'nest-commander';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoggerMiddleware } from './utils/middleware/middleware.logger';

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
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
        }),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => ({
                type: 'postgresql',
                driver: PostgreSqlDriver,
                dbName: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
