import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEventsGateway } from './chat.gateway';

@Module({
    imports: [],
    controllers: [ChatController],
    providers: [ChatService, ChatEventsGateway],
})
export class ChatModule {}
