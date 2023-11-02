import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreAppFacade } from '../stores/app';

/**
 * ファーストビューの共通パラメーターを追加するインターセプター。
 */
@Injectable({
  providedIn: 'root',
})
export class FirstViewCommonInterceptor implements HttpInterceptor {
  constructor(private storeAppFacade: StoreAppFacade) {}

  /**
   * HttpInterceptorの実装メソッド
   */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.storeAppFacade.state$.pipe(
      first(),
      map((appState) => {
        return req;
      }),
      switchMap((req) => next.handle(req))
    );
  }
}
