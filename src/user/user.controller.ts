import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    @Get('/google')
	@UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<string> {
        // redirect google login page
        return 'google redirect';
    }
}
