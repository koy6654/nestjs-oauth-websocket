import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    // expiresIn: process.env.JWT_,
                },
            }),
        }),
    ],
    providers: [AuthService],
})
export class AuthModule {}
