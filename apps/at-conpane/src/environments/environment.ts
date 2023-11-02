export const environment = {
  production: false,
  // local環境の時true
  isLocal: true,
  localChromium:
    './node_modules/puppeteer/.local-chromium/mac-950341/chrome-mac/Chromium.app/Contents/MacOS/Chromium',

  // assetsのパス
  assetsPath: '',

  siteConfig: {
    siteDomain: 'https://www.athome-ak02.com',
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
    isHTTPS: 'false',

    /**
     * CSR時のBFFサーバーのドメイン
     */
    csrBffDomain: 'localhost:3333',

    /**
     * SSR時のBFFサーバードメイン名
     */
    ssrBffDomain: 'localhost:3333',

    siteDomain: 'https://www.athome-ak02.com',
  },

  /**
   * 外部APIのアクセスキー
   */
  keyConfig: {
    /**
     * GoogleMapのApikey
     */
    googleMapKey: 'AIzaSyATQP1qezIsrQA02yLfiWZNoHGGlzmENE8',
    /**
     * 駅すぱあとの検索用Key
     */
    ekispartSearchKey: '1wDl3KMKCMALqTourUP32XpS',

    /**
     * EkispartのAPIKey
     */
    ekispartKey: 'f03de11e69db101520043f4a9f03fdaeaffafe8e',

    /**
     * Google Tag Manager用のキー。
     */
    gaKey: ['GTM-5G7Z38', 'GTM-TLBX4T'],
    ga4Key: ['OPT-5982TB3'],
  },

  // ログ設定
  logConfig: {
    impLogUrl: 'https://log.athome-cmn401.jp/001/imp.htm',
    // ログのルートディレクトリ
    logRootPath: './logs/front',
    // 種別を指定
    type: 'akiya',
    // PM2を有効にするか否か（有効:true / 無効:false)
    pm2Enabled: false,
    // PM2が有効な時にインスタンス名を指定(tools/pm2/ecosystem.front.configのinstance_varを参照)
    pm2InstanceVar: '',
  },
};
