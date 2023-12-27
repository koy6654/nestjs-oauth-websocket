import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../utils/auth/auth.service';
import { GoogleRedirectResponse, UserJwtDecodeBody } from './user.type';
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
    // private constructor를 통한 instance 관리도 가능하지만 NestJS가 제공해주는 싱글톤 패턴을 두고 수동으로 관리할 이유가 없다.

    // Google 로그인 페이지로 리다이렉션 할 API
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirct(
        @Req() req: Request,
    ): Promise<GoogleRedirectResponse> {
        const requestUser = (req as any).user;
        const user = await this.userService.getUser(requestUser);

        const userId = user.id;

        const token = this.authService.getEncodeJwtToken(userId);

        const redisKey = `session-${userId}`;
        await this.redisProvider.set(redisKey, JSON.stringify(token));

        return token;
    }
}
