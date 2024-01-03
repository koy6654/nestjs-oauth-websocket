import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, DecodedJwtToken } from './auth.type';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    private logger = new Logger();


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

    public getDecodeJwtToken(token: string): DecodedJwtToken {
        try {
            const verified = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            if (verified === false) {
                throw new Error('9397bd42-68f9-54c5-897f-b00788e4807e');    
            }

            const decodedToken = this.jwtService.decode(token);

            return decodedToken;
        } catch (err) {
            this.logger.error(err);
            throw new UnauthorizedException('invalid_token');
        }
    }
}
