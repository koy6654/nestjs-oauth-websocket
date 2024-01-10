import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AuthService } from '../auth.service';
import { RedisService } from '../../redis/redis.sevice';
import { UserSession } from '../auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
    private authService: AuthService;

    @Inject()
    private redisService: RedisService;

    @Inject('REDIS_CLIENT')
    private redisProvider: RedisClientType;

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        if (headers == null) {
            throw new BadRequestException('invalid_token');
        }

        const bearerToken = headers['authorization'];
        if (bearerToken == null) {
            throw new BadRequestException('invalid_token');
        }

        const token = bearerToken.substring('Bearer '.length);
        const decodedToken = this.authService.getDecodeJwtToken(token);

        const userId = decodedToken.userId;
        const redisKey = this.redisService.getSessionKey(userId);
        const redisValue = await this.redisProvider.get(redisKey);

        const userSession: UserSession = JSON.parse(redisValue);

        const verified = userSession.accessToken === token;
        if (verified) {
            request.session.userId = userId;
            return true;
        } else {
            throw new UnauthorizedException('invalid_token');
        }
    }
}
