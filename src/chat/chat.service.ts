import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ChatLog } from '../entities/chat_log.entity';
import { EntityRepository } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatLog)
        private readonly chatLogRepository: EntityRepository<ChatLog>,
    ) {}

    chat(): string {
        return 'login done';
    }

    async setChatLog(accountId: string, data: string): Promise<boolean> {
        const setChatLogData = {
            id: uuidv4(),
            accountId,
            value: data,
        };

        // await this.chatLogRepository.upsert(setChatLogData);
        await this.chatLogRepository.nativeInsert(setChatLogData);

        return true;
    }

    async deleteChatLog(accountId: string): Promise<number> {
        const nativeDeleteWhereOptions = {
            accountId,
        };

        const result = await this.chatLogRepository.nativeDelete(
            nativeDeleteWhereOptions,
        );

        return result;
    }
}
