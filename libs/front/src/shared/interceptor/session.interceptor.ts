/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, ReplaySubject } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { StoreSearchFacade } from '../stores/store-search';

/**
 * セッション情報を更新するインターセプター
 */
@Injectable({
  providedIn: 'root',
})
export class SessionInterceptor implements HttpInterceptor {
  private refreshSubject = new ReplaySubject<void>(1);

  constructor(private storeSearchFacade: StoreSearchFacade) {
    this.refreshSubject
      .asObservable()
      .pipe(debounceTime(300))
      .subscribe(() => this.storeSearchFacade.refreshSession());
  }
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
