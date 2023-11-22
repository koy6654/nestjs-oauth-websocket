import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import ConfigModule from './utils/config';
// import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
        // ConfigModule.forRoot({
        //     load: [config],
        //     isGlobal: true
        // }),
        UserModule,
    ],
    providers: [
        ConfigModule,
    ],
})
export class AppModule {}
