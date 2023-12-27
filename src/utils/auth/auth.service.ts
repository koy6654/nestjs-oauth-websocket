import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './auth.type';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    public getEncodeJwtToken(userId: string) {
        const payload: TokenPayload = { userId };

        const aceessTokenExpire = process.env.JWT_ACCESS_TOKEN_EXPIRE;
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: Number(aceessTokenExpire),
        });

        const refreshTokenExpire = process.env.JWT_REFRESH_TOKEN_EXPIRE;
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: Number(refreshTokenExpire),
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public getDecodeJwtToken(token: string) {
        const verified = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        console.log(verified);
    }
}
