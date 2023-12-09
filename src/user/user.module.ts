import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from './google.strategy';
import { Account } from '../entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([Account])],
    controllers: [UserController],
    providers: [UserService, GoogleStrategy],
})
export class UserModule {}
