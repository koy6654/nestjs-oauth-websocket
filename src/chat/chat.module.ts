import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEventsGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatLog } from '../entities/chat_log.entity';
import { AuthModule } from '../utils/auth/auth.module';

@Module({
    imports: [MikroOrmModule.forFeature([ChatLog]), AuthModule],
    controllers: [ChatController],
    providers: [ChatService, ChatEventsGateway],
})
export class ChatModule {}
