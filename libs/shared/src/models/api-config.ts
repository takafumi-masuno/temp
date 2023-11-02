/**
 * API用の設定。
 */
export class ApiConfig {
  /**
   * isHTTPS: APIサーバでHTTPS通信するか否か(true/false)
   */
  isHTTPS: string;

  /**
   * bffDomain: BFFサーバーのドメイン
   */
  csrBffDomain: string;

  /**
   * ssrBffDomain: SSR時のBFFサーバードメイン
   */
  ssrBffDomain: string;

  /**
   * webDomain: webサイトのドメイン
   */
  siteDomain: string;

  /**
   * apiAccessKey: アクセスキー
   */
  apiAccessKey?: string;

  /**
   * apiSecretKey: シークレットキー
   */
  apiSecretKey?: string;
}
