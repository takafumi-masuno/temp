/* eslint-disable */
import * as Log4js from 'log4js';
import { Request } from 'express';

export class LoggerLogic {
  /**
   * ロガー
   */
  private logger: Log4js.Logger;

  public static readonly REMOTE_IP = 'remoteIp';
  public static readonly REQUEST_ID = 'reqId';
  public static readonly SCREEN_ID = 'screenId';
  public static readonly UID = 'uid';
  public static readonly MESSAGE_ID = 'messageId';

  /**
   * デフォルトのログレイアウトパターン
   * 以下のロガーコンテキストを利用します。
   * - remoteIp: リモートIPアドレス
   * - reqId: リクエストID
   * - screenId: 画面ID
   * - uid: ユーザID
   * - messageId: メッセージID
   *
   * ログを出力する際に以下の様にロガーコンテキストを設定します。
   *
   * ```typescript
   *   const logger = new LoggerLogic('default', '/var/log', true, 'BFF_SV');
   *   logger.addContext(LoggerLogic.REMOTE_IP, '192.168.1.100');
   *   logger.addContext(LoggerLogic.REQUEST_ID, 'xxxxxx');
   *   logger.addContext(LoggerLogic.SCREEN_ID, 'xxxxxx');
   *   logger.addContext(LoggerLogic.UID, 'xxxxxx');
   *   logger.addContext(LoggerLogic.MESSAGE_ID, 'xxxxxx');
   *   logger.info('テスト');
   * ```
   */
  private static readonly DEFAULT_LAYOUT_PATTERN: string =
    '[%d{yyyy-MM-ddThh:mm:ss.SSS}][%p][%h][%z][%X{remoteIp}][%X{reqId}][%X{screenId}][%X{uid}][%X{messageId}] %m';

  private static readonly DEFAULT_LAYOUT_PATTERN_ACCESSLOG: string =
    '[%d{yyyy-MM-ddThh:mm:ss.SSS}][%p][%h][%z] %m';

  /**
   *
   * @param category カテゴリ(default or accesslog)
   * @param logRootPath ログ出力フォルダ
   * @param type 種別(bff, rent_office, rent_store, etc.)
   * @param pm2Enabled pm2有無
   * @param pm2InstanceVar pm2のインスタンスバージョン
   */
  constructor(
    category: string,
    logRootPath: string,
    type: string,
    pm2Enabled: boolean,
    pm2InstanceVar?: string
  ) {
    if (!this.logger) {
      this.init(logRootPath, type, pm2Enabled, pm2InstanceVar);
      this.logger = Log4js.getLogger(category);
    }
  }

  public getLogger(): Log4js.Logger {
    return this.logger;
  }

  /**
   * リクエストから必要な情報をログコンテキストに設定する
   * @param req ExpressのRequset
   */
  public setRequsetInfo(req: Request) {
    this.logger.addContext(
      LoggerLogic.REMOTE_IP,
      req.headers['x-forwarded-for']
        ? (req.headers['x-forwarded-for'] as string).split(',')[0]
        : req.connection.remoteAddress
    );
    this.logger.addContext(
      LoggerLogic.REQUEST_ID,
      req.headers['x-edge-request-id'] as string
    );
    this.logger.addContext(
      LoggerLogic.SCREEN_ID,
      req.headers['x-atcsite-screen-id'] as string
    );
    this.logger.addContext(
      LoggerLogic.UID,
      req.headers['x-atcsite-psucom'] as string
    );
  }

  private init(
    logRootPath: string,
    type: string,
    pm2Enabled: boolean,
    pm2InstanceVar?: string
  ): void {
    Log4js.configure({
      appenders: {
        console: { type: 'console', layout: this.getLayout() },
        debug_raw: {
          type: 'dateFile',
          filename: `${logRootPath}/debug-${type}.log`,
          layout: this.getLayout(),
          keepFileExt: true,
          mode: 0o644,
          compress: true,
        },
        debug: {
          type: 'logLevelFilter',
          appender: 'debug_raw',
          level: 'debug',
          maxLevel: 'debug',
        },
        access: {
          type: 'dateFile',
          filename: `${logRootPath}/access-${type}.log`,
          layout: this.getAccesslogLayout(),
          keepFileExt: true,
          mode: 0o644,
          compress: true,
        },
        app_raw: {
          type: 'dateFile',
          filename: `${logRootPath}/app-${type}.log`,
          layout: this.getLayout(),
          keepFileExt: true,
          mode: 0o644,
          compress: true,
        },
        app: {
          type: 'logLevelFilter',
          appender: 'app_raw',
          level: 'info',
          maxLevel: 'warn',
        },
        error_raw: {
          type: 'dateFile',
          filename: `${logRootPath}/error-${type}.log`,
          layout: this.getLayout(),
          keepFileExt: true,
          mode: 0o644,
          compress: true,
        },
        error: {
          type: 'logLevelFilter',
          appender: 'error_raw',
          level: 'error',
          mode: 0o644,
        },
      },
      categories: {
        default: {
          appenders: ['console', 'debug', 'app', 'error'],
          level: 'debug',
        },
        accesslog: { appenders: ['access'], level: 'debug' },
      },
      pm2: pm2Enabled ? true : false,
      pm2InstanceVar: pm2InstanceVar ? pm2InstanceVar : undefined,
    });
  }

  private getLayout(): { type: string; pattern: string } {
    return { type: 'pattern', pattern: LoggerLogic.DEFAULT_LAYOUT_PATTERN };
  }
  private getAccesslogLayout(): { type: string; pattern: string } {
    return {
      type: 'pattern',
      pattern: LoggerLogic.DEFAULT_LAYOUT_PATTERN_ACCESSLOG,
    };
  }

  /**
   * ロガーコンテキストを設定します。
   * @param key トークンのキー名
   * @param value 値
   */
  public addContext(key: string, value: string): void {
    this.logger.addContext(key, value);
  }

  public fatal(message: any, trace?: string, context?: string) {
    this.logger.fatal(message, trace ? trace : '', context ? context : '');
  }
  public error(message: any, trace?: string, context?: string) {
    this.logger.error(message, trace ? trace : '', context ? context : '');
  }
  public warn(message: any, context?: string) {
    this.logger.warn(message, context ? context : '');
  }
  public log(message: any, context?: string): void {
    this.info(message, context);
  }
  public info(message: any, context?: string): void {
    this.logger.info(message, context ? context : '');
  }
  public debug?(message: any, context?: string) {
    this.logger.debug(message, context ? context : '');
  }
  public trace?(message: any, context?: string) {
    this.logger.trace(message, context ? context : '');
  }
}
