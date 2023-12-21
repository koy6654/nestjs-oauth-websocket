import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { GoogleStrategy } from './google.strategy';
import { Account } from '../entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        MikroOrmModule.forFeature([Account]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService, GoogleStrategy],
})
export class UserModule {}
