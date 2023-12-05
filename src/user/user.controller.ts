import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    // Google 로그인 페이지로 리다이렉션 할 API
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirct(@Req() req: any): Promise<string> {
        console.log(req);

        if (!req.body) {
            return 'user_not_exist';
        }

        return 'user_exist';
    }
}
