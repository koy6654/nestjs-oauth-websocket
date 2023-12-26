import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { GoogleRedirectResponse, UserJwtDecodeBody } from './user.type';

@Controller('user')
export class UserController {
    // 생성자 기반 주입
    // constructor(private userService: UserService) {}

    // 속성 기반 주입
    @Inject()
    private userService: UserService;

    @Inject()
    private authService: AuthService;
    // private constructor를 통한 instance 관리도 가능하지만 NestJS가 제공해주는 싱글톤 패턴을 두고 수동으로 관리할 이유가 없다.

    // Google 로그인 페이지로 리다이렉션 할 API
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirct(@Req() req: Request, @Res() res: Response): Promise<GoogleRedirectResponse> {
        const requestUser = (req as any).user;
        const user = await this.userService.getUser(requestUser);

        const token = this.authService.getEncodeJwtToken(user.id);
        console.log(token);
        return token;
    }

    // Google 로그인 이후 리다이렉션 받는 API
    @Get('google/test')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async googleTest(@Req() req: Request, @Res({passthrough: true}) res: Response): Promise<GoogleRedirectResponse> {
        const user = await this.userService.getUser({
            provider: 'google',
            providerId: '108861330919310510437',
            name: 'koy',
            email: 'koy410994@gmail.com',
        });

        const token = this.authService.getEncodeJwtToken(user.id);
        console.log(token);
        // const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRE}`;

        return token;
    }

    @Post('jwt/decode')
    async jwtDecode(@Body() req: UserJwtDecodeBody, @Res() res: Response): Promise<boolean> {
        const token = req.token;

        const test = this.authService.getDecodeJwtToken(token);
        console.log(test);

        return res.json();
    }
}
