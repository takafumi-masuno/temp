/* eslint-disable @typescript-eslint/no-explicit-any */
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { NavigationService } from '../services';

/**
 * 認証API向けのインターセプター
 */
@Injectable({
  providedIn: 'root',
})
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject('LoggerLogic') private logger: any,
    private navigationService: NavigationService
  ) {}

  /**
   * HttpInterceptorの実装メソッド
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err) => {
        (this.logger || console).error(
          'API通信が失敗しました',
          req.urlWithParams
        );
        (this.logger || console).error(err);
        if (
          req.url.includes('first-view') &&
          err instanceof HttpErrorResponse
        ) {
          switch (err.status) {
            case 404:
              this.navigationService.navigateToNotFoundPage();
              return EMPTY;
            case 500:
            case 503:
            case 504:
              this.navigationService.navigateTo('/please_wait', true);
              return EMPTY;
          }
        }
        throwError(() => new Error(''));
      })
    );
  }
}
