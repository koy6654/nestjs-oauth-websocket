import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, GoogleStrategy],
})
export class UserModule {}
