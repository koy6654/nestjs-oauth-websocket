import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ChatLog } from '../entities/chat_log.entity';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatLog)
        private readonly chatLogRepository: EntityRepository<ChatLog>
    ) {

    }

    chat(): string {
        return 'login done';
    }

    async deleteChatLog(accountId: string): Promise<number> {
        const nativeDeleteWhereOptions = {
            accountId,
        };

        const result = await this.chatLogRepository.nativeDelete(nativeDeleteWhereOptions);

        return result;
    }
}
