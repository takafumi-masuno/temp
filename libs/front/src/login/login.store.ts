import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';
import { LoginRequest } from './models';

export interface LoginState {
  isPasswordReset: boolean;
  errorMessage: string;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private loginService: LoginService
  ) {
    super({
      isPasswordReset: false,
      errorMessage: '',
    });
  }

  readonly isPasswordReset$: Observable<boolean> = this.select(
    (state) => state.isPasswordReset
  );

  readonly errorMessage$: Observable<string> = this.select(
    (state) => state.errorMessage
  );

  /**
   * パスワード初期化フラグをsetする
   */
  readonly setIsPasswordReset = this.updater<boolean>(
    (state, isPasswordReset) => ({
      ...state,
      isPasswordReset,
    })
  );

  /**
   * エラーメッセージをsetする
   */
  readonly setErrorMessage = this.updater<string>((state, errorMessage) => ({
    ...state,
    errorMessage,
  }));

  /**
   * ログインする
   */
  readonly loginPostSend = this.effect((args$: Observable<LoginRequest>) => {
    return args$.pipe(
      switchMap((credentials) =>
        this.loginService.execute(credentials).pipe(
          tapResponse(
            (result) => result,
            (e) => console.error(e)
          )
        )
      ),
      map((loginInfo) => {
        if (loginInfo.detail) {
          this.setIsPasswordReset(true);
          this.setErrorMessage(loginInfo.detail);
        } else if (loginInfo.sessionId && !loginInfo.isFirstTimeLogin) {
          this.cookieService.set('sessionId', loginInfo.sessionId);
          this.route.queryParams.subscribe((params) => {
            /** セッション切れでログインに遷移した場合、前画面に戻る */
            if (params.prevPage) {
              this.router.navigate([`${params.prevPage}`]);
            } else {
              this.router.navigate(['/']);
            }
          });
        } else {
          this.cookieService.set('sessionId', loginInfo.sessionId);
          this.router.navigate(['password/reset']);
        }
      })
    );
  });
}
