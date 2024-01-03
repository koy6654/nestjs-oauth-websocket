import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './middleware.logger';

@Module({
    imports: [],
    providers: [LoggerMiddleware],
    exports: [LoggerMiddleware],
})
export class MiddlewareModule {}
