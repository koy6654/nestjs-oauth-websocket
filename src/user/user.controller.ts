import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // Google 로그인 페이지로 리다이렉션 할 API
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirct(@Req() req: any): Promise<string> {
        const userExist = await this.userService.getUserExist(req.user);

        if (userExist) {
            return 'user_exist';
        }

        return 'user_not_exist';
    }
}
