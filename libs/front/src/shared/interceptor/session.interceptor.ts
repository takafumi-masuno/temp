/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, ReplaySubject } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

/**
 * セッション情報を更新するインターセプター
 */
@Injectable({
  providedIn: 'root',
})
export class SessionInterceptor implements HttpInterceptor {
  private refreshSubject = new ReplaySubject<void>(1);

  /**
   * HttpInterceptorの実装メソッド
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => this.refreshSubject.next()));
  }
}
