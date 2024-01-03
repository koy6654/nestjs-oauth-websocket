import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware<Request, Response> {
    private logger = new Logger();

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish', () => {
            const { statusCode } = response;
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
