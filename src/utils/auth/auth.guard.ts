import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';

// import { NextFunction, Request, Response } from 'express';
// import { MemberService } from 'src/member/member.service';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    // return true 일때 pass
    canActivate() {
        if (true) {
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
