import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserAgentService {
  constructor(
    @Optional() @Inject(REQUEST) private req: Request,
    @Inject(PLATFORM_ID) private platformId: unknown
  ) {}

  /**
   * @returns ユーザーエージェント
   */
  public getUserAgent(): string {
    return (
      isPlatformServer(this.platformId)
        ? this.req.get('User-Agent')
        : window.navigator.userAgent
    ).toLowerCase();
  }

  public isOtherBrowser(): boolean {
    const userAgent = this.getUserAgent();
    return [
      'Safari Line/',
      'GSA/',
      'RakutenWebsearch/',
      'YJApp',
      'FxiOS/',
    ].some((ua) => userAgent.includes(ua.toLowerCase()));
  }
}
