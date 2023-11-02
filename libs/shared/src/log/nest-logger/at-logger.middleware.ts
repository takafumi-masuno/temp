import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AtLoggerService } from './at-logger.service';

@Injectable()
export class AtLoggerMiddleware implements NestMiddleware {
  constructor(private logger: AtLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.setRequestInfo(req);
    next();
    // アクセスログの出力
    const logformat = `${req.ip} - "${req.method} ${req.originalUrl} HTTP/${
      req.httpVersion
    }" ${res.statusCode} "${
      req.get('Referrer') ? req.get('Referrer') : ''
    }" "${req.get('user-agent')}" param: ${JSON.stringify(
      req.params
    )} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(
      req.body
    )} cookie: ${JSON.stringify(req.cookies)} `;
    const status = Math.floor(res.statusCode / 100) * 100;
    switch (status) {
      case 300:
        console.log;
        break;
      case 400:
      case 500:
        console.log;
        break;
      default:
        console.log();
    }
  }
}
