import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginStore } from './login.store';

@Component({
  selector: 'athome-customhouse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginStore],
})
export class LoginComponent {
  userId: string;
  password: string;
  errorMessages: string[] = [];
  isExpired = false;

  constructor(private route: ActivatedRoute, public store: LoginStore) {}

  ngOnInit() {
    /**
     * パスワードを初期化する
     */
    this.store.isPasswordReset$.subscribe((isPasswordReset) => {
      if (isPasswordReset) {
        this.resetPassword();
      }
    });

    /**
     * エラーメッセージを設定する
     */
    this.store.errorMessage$.subscribe((errorMessage) => {
      this.isExpired = false;
      this.errorMessages = errorMessage ? [errorMessage] : [];
    });

    /**
     * セッションタイムアウト用のメッセージを設定する
     */
    this.route.queryParams.subscribe((params) => {
      if (params.prevPage) {
        this.setSessionTimeoutErrorMessage();
      }
    });
  }

  /**
   * ログインする
   */
  loginPostSend() {
    this.store.loginPostSend({
      userId: this.userId,
      password: this.password,
    });
  }

  /**
   * パスワードを初期化する
   */
  private resetPassword() {
    this.password = '';
    this.store.setIsPasswordReset(false);
  }

  /**
   * セッションタイムアウト用のエラーメッセージを設定する
   */
  private setSessionTimeoutErrorMessage() {
    this.isExpired = true;
    // TODO：メッセージ未確定
    this.errorMessages.push(
      'セッションがタイムアウトしました。再度ログインしてください。'
    );
  }
}
