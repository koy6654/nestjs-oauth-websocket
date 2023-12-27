import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../utils/auth/auth.module';
import { RedisModule } from '../utils/redis/redis.module';
import { GoogleStrategy } from './google.strategy';
import { Account } from '../entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Account]), AuthModule, RedisModule],
    controllers: [UserController],
    providers: [UserService, GoogleStrategy],
})
export class UserModule {}
