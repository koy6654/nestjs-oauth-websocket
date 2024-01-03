import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
    constructor() {}

    public getSessionKey(userId: string) {
        return `session-${userId}`;
    }
}
