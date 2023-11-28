import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    chat(): string {
        return 'login done';
    }
}
