import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AuthService } from './auth.service';
import { RedisService } from '../redis/redis.sevice';

// import { NextFunction, Request, Response } from 'express';
// import { MemberService } from 'src/member/member.service';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
    private authService: AuthService;

    @Inject()
    private redisService: RedisService;

    @Inject('REDIS_CLIENT')
    private redisProvider: RedisClientType;

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        const bearerToken = request.headers['authorization'];
        if (bearerToken == null) {
            throw new BadRequestException('invalid_token');
        }

        const token = bearerToken.substring('Bearer '.length);
        const decodedToken = this.authService.getDecodeJwtToken(token);

        const redisKey = this.redisService.getSessionKey(decodedToken.userId);
        const verified = await this.redisProvider.get(redisKey);
        if (verified) {
            return true;
        } else {
            throw new UnauthorizedException('invalid_token');
        }
    }
}

// export class JwtMiddleWare implements NestMiddleware<Request, Response> {
//   constructor(
//     private readonly jwtService: AuthService,
//     private readonly memberService: MemberService,
//   ) { }
//   async use(req: Request, res: Response, next: NextFunction) {
//     if ('x-jwt' in req.headers) {
//       const token = req.headers['x-jwt'];
//       try {
//         const decoded = this.jwtService.verify(token.toString()); // 토큰을 object로 변경한다.
//         if (typeof decoded === 'object' && decoded.hasOwnProperty('email_id')) { // email_id 가 들어있는지 확인
//           const { ok, memberInfo } = await this.memberService.getMemberInfo({
//             email_id: decoded['email_id'],// email로 사용자 정보를 얻어와서 req에 넣어주기
//           });
//           if (ok) req['memberInfo'] = memberInfo;
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     next();
//   }
// }
