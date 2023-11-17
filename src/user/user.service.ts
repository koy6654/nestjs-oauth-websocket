import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    login(): string {
        return 'login done';
    }
}
