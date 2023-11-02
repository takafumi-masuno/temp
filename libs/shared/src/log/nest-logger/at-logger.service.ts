/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService, Scope, Inject } from '@nestjs/common';
import { Request } from 'express';
import { LoggerLogic } from '../index';

@Injectable({ scope: Scope.TRANSIENT })
export class AtLoggerService implements LoggerService {
  private readonly logger: LoggerLogic;

  constructor(
    @Inject('logConfig')
    private logConfig: {
      logRootPath: string;
      type: string;
      pm2Enabled: boolean;
      pm2InstanceVar: string;
    }
  ) {
    this.logger = new LoggerLogic(
      'default',
      logConfig.logRootPath,
      logConfig.type,
      logConfig.pm2Enabled,
      logConfig.pm2InstanceVar
    );
  }

  /**
   * リクエストから必要な情報をログコンテキストに設定する
   * @param req ExpressのRequset
   */
  setRequestInfo(req: Request) {
    this.logger.setRequsetInfo(req);
  }

  log(message: any, context?: string) {
    this.logger.info(message, context ? context : '');
  }
  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, trace ? trace : '', context ? context : '');
  }
  warn(message: any, context?: string) {
    this.logger.warn(message, context ? context : '');
  }
  debug?(message: any, context?: string) {
    this.logger.debug(message, context ? context : '');
  }
}
