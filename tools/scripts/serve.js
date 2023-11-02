/**
 * 指定されたアプリをserve起動します。
 *
 * Usage: node serve.js <appName> <port>
 *     appName: at-business-bff, at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other
 *     port: 省略時(4200)
 */

const { spawn } = require('child_process');
const { COLORS } = require('./const');

// 引数チェック
if (process.argv.length < 3) {
  console.log(COLORS.GREEN + 'Usage: npm run start -- <appName> <port>');
  console.log('  appName: serve起動するアプリ名');
  console.log(
    '    at-business-bff, at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other, at-estate, at-resort'
  );
  console.log('    port: 省略時は4200（bffの時は指定不可)' + COLORS.RESET);
  process.exit(-1);
}

// 処理開始時間
const startTime = new Date();

// appName
const appName = process.argv[2];
// port
const port = process.argv.length === 4 ? process.argv[3] : undefined;

// spawnコマンドの終了コード
let spawnCode = 0;
// ここからコマンド開始
console.log(`起動します。(appName=${appName}, port=${port ? port : '-'})`);
let cmdargs = [];
if (port === undefined) {
  cmdargs = ['serve', appName];
} else {
  cmdargs = ['serve', appName, '--port', port];
}
const ps = spawn('ng', cmdargs);
ps.stdout.on('data', (data) => process.stdout.write(data.toString()));
ps.stderr.on('data', (data) =>
  process.stderr.write(`${COLORS.RED}${data.toString()}${COLORS.RESET}`)
);
ps.on('exit', (code) => {
  if (code !== 0) {
    spawnCode = code;
    return;
  }
});

// 終了時のイベント処理（異常検知)
process.on('exit', (code) => {
  // 処理時間
  const procTime = (new Date() - startTime) / 1000;
  console.log(spawnCode);
  console.log(code);
  if (spawnCode !== 0 || code !== 0) {
    console.error(
      '起動を失敗しました。[RetCode: ' + spawnCode + ', Execution time: %d秒]',
      procTime
    );
    process.exit(spawnCode);
  }
  console.log('起動しました。[Execution time: %d秒]', procTime);
});
