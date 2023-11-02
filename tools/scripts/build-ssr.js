/**
 * 指定されたプロジェクト名、環境をSSR向けビルドをします。
 *
 * Usage: node build-ssr.js <projectName> <environment>
 *     appName: at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other
 *     environment: local, ak01, ak02, ak03, ak04, ak05, ak06, ak51, ak52, ad01, ap01, prod, poc
 */

const { COLORS } = require('./const');
const { buildSsr } = require('./process');

// 引数チェック
if (process.argv.length > 4 || process.argv.length <= 3) {
  console.log(
    COLORS.GREEN + 'Usage: npm run build:ssr -- <appName> <environment>'
  );
  console.log('  appName: SSRビルドするAngluarのアプリ名');
  console.log(
    '    at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other'
  );
  console.log(
    '    environment: ak01, ak02, ak03, ak04, ak05, ak06, ak51, ak52, ad01, ap01, prod, poc' +
      COLORS.RESET
  );
  process.exit(-1);
}

buildSsr();
