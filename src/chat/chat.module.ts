import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEventsGateway } from './chat.gateway';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatLog } from '../entities/chat_log.entity';
import { AuthModule } from '../utils/auth/auth.module';
import { RedisModule } from '../utils/redis/redis.module';

@Module({
    imports: [MikroOrmModule.forFeature([ChatLog]), AuthModule, RedisModule],
    controllers: [ChatController],
    providers: [ChatService, ChatEventsGateway],
})
export class ChatModule {}
