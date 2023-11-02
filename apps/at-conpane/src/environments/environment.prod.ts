export const environment = {
  production: true,
  // local環境の時true
  isLocal: false,
  localChromium: '/usr/bin/chromium-browser',

  // assetsのパス
  assetsPath: '',

  // TODO: 現状開発段階なので、検証環境に向ける。
  siteConfig: {
    siteDomain: 'https://www.athome.co.jp',
  },

  // TODO DFPの項目確認
  dfpConfig: {
    unitCd: '7253',
    appName: 'jigyo_chintai',
    syomokuCd: 'jigyo_chintai',
  },

  /**
   * API用の環境設定
   */
  apiConfig: {
    /**
     * APIサーバでHTTPS通信するか否か(true/false)
     */
    isHTTPS: 'true',

    /**
     * CSR時のBFFサーバーのドメイン
     */
    csrBffDomain: 'www.athome.co.jp',

    /**
     * SSR時のBFFサーバードメイン名
     */
    ssrBffDomain: 'bff-loadbalancer:8080',

    siteDomain: 'https://www.athome.co.jp',
  },

  /**
   * 外部APIのアクセスキー
   */
  keyConfig: {
    /**
     * 駅すぱあとの検索用Key
     */
    ekispartSearchKey: '1wDl3KMKCMALqTourUP32XpS',

    /**
     * EkispartのAPIKey
     */
    ekispartKey: 'e7b9c5cad3dafba68049ecc3e7d0df1e94470b2d',

    /**
     * Google Tag Manager用のキー。
     */
    gaKey: ['GTM-5G7Z38', 'GTM-TLBX4T'],
    ga4Key: ['GTM-PJKZZV3'],
  },

  // ログ設定
  logConfig: {
    impLogUrl: 'https://log.athome.co.jp/001/imp.htm',
    // ログのルートディレクトリ
    logRootPath: '/var/log/apps',
    // 種別を指定
    type: 'akiya',
    // PM2を有効にするか否か（有効:true / 無効:false)
    pm2Enabled: true,
    // PM2が有効な時にインスタンス名を指定(tools/pm2/ecosystem.front.configのinstance_varを参照)
    pm2InstanceVar: 'FRONT_AKIYA_SV',
  },
};
