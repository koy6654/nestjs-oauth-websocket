import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ChatLog } from '../entities/chat_log.entity';
import { EntityRepository } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
    private readonly openai: OpenAI;

    constructor(
        @InjectRepository(ChatLog)
        private readonly chatLogRepository: EntityRepository<ChatLog>,
    ) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY,
        });
    }

    private logger: Logger = new Logger();

    chat(): string {
        return 'login done';
    }

    async setChatLog(accountId: string, data: string): Promise<boolean> {
        const setChatLogData = {
            id: uuidv4(),
            accountId,
            value: data,
        };

        try {
            const chatCompletion = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: 'Hello gpt' }],
                model: 'gpt-3.5-turbo',
            });
            console.log(chatCompletion);
        } catch (err) {
            // this.logger.error(err);
            this.logger.error('Need to pay');
        }

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
