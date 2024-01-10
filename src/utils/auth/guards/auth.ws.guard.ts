import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RedisService } from '../../redis/redis.sevice';
import { RedisClientType } from 'redis';
import { UserSession } from '../auth.type';

@Injectable()
export class WsGuard implements CanActivate {
    @Inject()
    private authService: AuthService;

    @Inject()
    private redisService: RedisService;

    @Inject('REDIS_CLIENT')
    private redisProvider: RedisClientType;

    async canActivate(context: ExecutionContext) {
        // TODO: Postman issue로 data에 token 전송 -> header로 변경해야함
        const data = context.switchToWs().getData();
        const token = data.token;
        const decodedToken = this.authService.getDecodeJwtToken(token);

        const userId = decodedToken.userId;
        const redisKey = this.redisService.getSessionKey(userId);
        const redisValue = await this.redisProvider.get(redisKey);

        const userSession: UserSession = JSON.parse(redisValue);

        const verified = userSession.accessToken === token;
        if (verified) {
            return true;
        } else {
            throw new UnauthorizedException('invalid_token');
        }
    }
}
