import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEventsGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatLog } from 'src/entities/chat_log.entity';

@Module({
    imports: [MikroOrmModule.forFeature([ChatLog])],
    controllers: [ChatController],
    providers: [ChatService, ChatEventsGateway],
})
export class ChatModule {}
