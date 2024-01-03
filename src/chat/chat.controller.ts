import { Controller, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '../utils/auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('/test')
    postTest() {
        return this.chatService.chat();
    }
}
