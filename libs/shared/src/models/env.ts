import { InjectionToken } from '@angular/core';

export const APP_ENV = new InjectionToken<EnvModel>('Application config');

// 現時点のenvモデル envの型を変えたらこちらを変えないといけない、使うときにエラーが出るから気づくはず
export interface EnvModel {
  production: boolean;
  // local環境の時true
  isLocal: boolean;

  // assetsのURL
  assetsPath: string;

  siteConfig: {
    siteDomain: string;
  };

  dfpConfig: {
    unitCd: string;
    appName: string;
    syomokuCd: string;
    production?: boolean;
  };

  /**
   * API用の環境設定
   */
  apiConfig?: {
    /**
     * APIサーバでHTTPS通信するか否か(true/false)
     */
    isHTTPS: string;

    /**
     * CSR時のBFFサーバーのドメイン
     */
    csrBffDomain: string;

    /**
     * SSR時のBFFサーバードメイン名
     */
    ssrBffDomain: string;
  };

  /**
   * 外部APIのアクセスキー
   */
  keyConfig: {
    /**
     * GoogleMapのApikey
     */
    googleMapKey: string;

    /**
     * 駅すぱあとの検索用Key
     */
    ekispartSearchKey: string;

    /**
     * 駅すぱあとのAPIKey
     */
    ekispartKey: string;

    /**
     * Google Tag Manager用のキー。
     */
    gaKey: string[];
    /**
     * Google4 Tag Manager用のキー。
     */
    ga4Key: string[];
  };

  // ログ設定
  logConfig: {
    impLogUrl: string;
    // ログのルートディレクトリ
    logRootPath: string;
    // 種別を指定
    type: string;
    // PM2を有効にするか否か（有効:true / 無効:false)
    pm2Enabled: false;
    // PM2が有効な時にインスタンス名を指定(tools/pm2/ecosystem.front.configのinstance_varを参照)
    pm2InstanceVar: string;
  };
  awsCognitoIdentityPoolId: string;
  streamName: string;
}
