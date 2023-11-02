import { HttpParams, HttpHeaders } from '@angular/common/http';

/**
 * AngularのHttpClient用のHttpOption
 */
export interface HttpOptions {
  // ヘッダーの設定
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  // レスポンスの受け方
  observe: 'response';
  // HttpPramesの設定
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  // 進行状況イベントの有無
  reportProgress?: boolean;
  // レスポンスのタイプ
  responseType: 'text';
  // (クライアントとサーバのオリジンが違う場合)クロスオリジンの許可
  withCredentials?: boolean;
}
