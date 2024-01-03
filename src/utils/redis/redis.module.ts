import { Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.sevice';

@Module({
    providers: [redisProvider, RedisService],
    exports: [redisProvider, RedisService],
})
export class RedisModule {}
