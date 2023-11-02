import { Injectable, Optional, Inject } from '@angular/core';
import { XhrFactory } from '@angular/common';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Observable } from 'rxjs';
import * as xhr2 from 'xhr2';

/**
 * SSR専用Cookie設定インターセプター
 * SSR(Express)でprovideされたRequestオブジェクトからCookie情報をHttpClientのリクエストにコピーする
 */
@Injectable()
export class SsrCookieInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) private httpRequest) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // If optional request is provided, we are server side
    if (this.httpRequest?.headers?.cookie) {
      req = req.clone({
        setHeaders: { Cookie: this.httpRequest.headers.cookie },
      });
    }
    return next.handle(req);
  }
}

/**
 * 制限解除したXMLHttpRequestを生成するファクトリークラス
 */
@Injectable()
export class ServerXhr implements XhrFactory {
  build(): XMLHttpRequest {
    // SSR時には擬似XMLHttpRequestを使って通信をするが、ブラウザで動作する物ではないので制限を解除する
    xhr2.XMLHttpRequest.prototype._restrictedHeaders = {};

    return new xhr2.XMLHttpRequest();
  }
}
