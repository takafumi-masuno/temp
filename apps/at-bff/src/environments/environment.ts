export const environment = {
  production: false,
  healthCheck: '/healthcheck',
  msConfig: {
    //microservicesHost: 'http://10.19.16.41',
    //microservicesSearchHost: 'http://10.19.16.41',
    //microservicesDetailHost: 'http://10.19.16.41',
    // microservicesBackendHost: 'http://10.19.16.41'

    microservicesHost: 'http://csite-api.athome-ak02.com',
    microservicesSearchHost: 'http://csite-api.athome-ak02.com',
    microservicesDetailHost: 'http://csite-api.athome-ak02.com',
    microservicesBackendHost: 'http://csite-api.athome-ak02.com',
  },

  // ログ設定
  logConfig: {
    impLogUrl: 'https://log.athome-cmn401.jp/001/imp.htm',
    // ログのルートディレクトリ
    logRootPath: './logs/bff',
    // bff固定
    type: 'bff',
    // PM2を有効にするか否か（有効:true / 無効:false)
    pm2Enabled: false,
    // PM2が有効な時にインスタンス名を指定(tools/pm2/ecosystem.bff.configのinstance_varを参照)
    pm2InstanceVar: '',
  },
};
