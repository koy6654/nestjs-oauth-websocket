import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../utils/auth/auth.service';
import { RedisService } from '../utils/redis/redis.sevice';
import { GoogleRedirectResponse } from './user.type';
import { RedisClientType } from 'redis';

@Controller('user')
export class UserController {
    // 생성자 기반 주입
    // constructor(private userService: UserService) {}

    // 속성 기반 주입
    @Inject()
    private userService: UserService;

    @Inject()
    private authService: AuthService;

    @Inject('REDIS_CLIENT')
    private redisProvider: RedisClientType;

    @Inject()
    private redisService: RedisService;
    // private constructor를 통한 instance 관리도 가능하지만 NestJS가 제공해주는 싱글톤 패턴을 두고 수동으로 관리할 이유가 없다.

    // Google 로그인 페이지로 리다이렉션 할 API
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/redirect')
    // @UseGuards(AuthGuard('google')) 실제 서비스 오픈 전까지는 꺼둠
    async googleAuthRedirct(
        @Req() req: Request,
    ): Promise<GoogleRedirectResponse> {
        const requestUser = (req as any).user;

        let userId = null;
        if (process.env.NODE_ENV === 'production') {
            const user = await this.userService.getUser(requestUser);
            userId = user.id;
        } else {
            userId = '07a06c49-4a76-55ea-b4dd-7c3c88edfe09';
        }

        const token = this.authService.getEncodeJwtToken(userId);

        const redisKey = this.redisService.getSessionKey(userId);
        await this.redisProvider.set(redisKey, JSON.stringify(token));

        return token;
    }
}
