const { COLORS } = require('./const');
const { spawn } = require('child_process');

/**
 * AngluarアプリををSSRビルドする
 */
exports.buildSsr = function (isServe = false) {
  // 処理開始時間
  const startTime = new Date();

  // appName
  const appName = process.argv[2];
  // environment
  const env = process.argv[3] || 'local';

  // spawnコマンドの終了コード
  let spawnCode = 0;

  // buildコマンド開始
  console.log(`ビルドを開始します。(appName=${appName}, env=${env})`);
  let cmd = 'ng';
  if (appName === 'at-business-bff') {
    // NestJSの場合はnxコマンドでビルド
    cmd = 'nx';
  }
  let buildargs = [];
  if (env === 'local') {
    buildargs = [
      'build',
      appName,
      '--delete-output-path=true',
      '--skip-nx-cache',
    ];
  } else {
    buildargs = [
      'build',
      appName,
      `--configuration=${env}`,
      '--delete-output-path=true',
      '--skip-nx-cache',
    ];
  }
  // console.log(`cmd: ${cmd}, args: ${JSON.stringify(buildargs)}`);
  const ps = spawn(cmd, buildargs);
  ps.stdout.on('data', (data) => process.stdout.write(data.toString()));
  ps.stderr.on('data', (data) => {
    const msg = data.toString().toUpperCase();
    if (msg.match(/ERROR/) || msg.match(/FATAL/)) {
      process.stderr.write(`${COLORS.RED}${data.toString()}${COLORS.RESET}`);
    } else {
      process.stderr.write(`${COLORS.YELLOW}${data.toString()}${COLORS.RESET}`);
    }
  });
  ps.on('exit', (code) => {
    if (code !== 0) {
      spawnCode = code;
      return;
    }
    // server buildコマンドを子プロセスとして開始
    // 例: ng run at-rent-store:server:ak01
    const ps2 = spawn('ng', ['run', `${appName}:server:${env}`]);
    ps2.stdout.on('data', (data) => process.stdout.write(data.toString()));
    ps2.stderr.on('data', (data) => {
      const msg = data.toString().toUpperCase();
      if (msg.match(/ERROR/) || msg.match(/FATAL/)) {
        process.stderr.write(`${COLORS.RED}${data.toString()}${COLORS.RESET}`);
      } else {
        process.stderr.write(
          `${COLORS.YELLOW}${data.toString()}${COLORS.RESET}`
        );
      }
    });
    ps2.on('exit', (code) => {
      if (code !== 0) {
        spawnCode = code;
        return;
      }
      if (isServe) {
        console.log(`起動します。(appName=${appName}, env=${env})`);
        const ps = spawn('node', [`dist/${appName}/server/main.js`]);
        ps.stdout.on('data', (data) => process.stdout.write(data.toString()));
        ps.stderr.on('data', (data) => {
          const msg = data.toString().toUpperCase();
          if (msg.match(/ERROR/) || msg.match(/FATAL/)) {
            process.stderr.write(
              `${COLORS.RED}${data.toString()}${COLORS.RESET}`
            );
          } else {
            process.stderr.write(
              `${COLORS.YELLOW}${data.toString()}${COLORS.RESET}`
            );
          }
        });
      }
    });
  });

  // 終了時のイベント処理（異常検知)
  process.on('exit', (code) => {
    // 処理時間
    const procTime = (new Date() - startTime) / 1000;
    if (spawnCode !== 0 || code !== 0) {
      console.error(
        'ビルドが異常終了しました。[RetCode: ' +
          spawnCode +
          ', Execution time: %d秒]',
        procTime
      );
      process.exit(spawnCode);
    }
    console.log('ビルドが完了しました。[Execution time: %d秒]', procTime);
  });
};
