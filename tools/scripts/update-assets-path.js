/**
 * 指定されたenvironmentのassetsPathを更新します。
 *
 * Usage: node update-assets-path.js <projectName> <env> <buildNo>
 *     projectName: at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other
 *     environment: local, ak01, ak02, ak03, ak04, ak05, ak06, ak51, ak52, ad01, ap01, prod, poc
 *     buildNo: 任意のビルド番号
 */

const { COLORS } = require('./const');
const fs = require('fs');
const { exit } = require('process');

// 引数チェック
if (process.argv.length > 5 || process.argv.length <= 4) {
  console.log(
    COLORS.GREEN +
      'Usage: npm run build:updatebuildno -- <projectName> <environment> <buildNo>'
  );
  console.log('  appName: ビルド番号を更新するAngluarのアプリ名');
  console.log(
    '    at-rent-office, at-rent-store, at-rent-parking, at-rent-tochi, at-rent-souko, at-rent-other, at-buy-store, at-buy-office, at-buy-other'
  );
  console.log(
    '    environment: ak01, ak02, ak03, ak04, ak05, ak06, ak51, ak52, ad01, ap01, prod, poc' +
      COLORS.RESET
  );
  process.exit(-1);
}

const projectName = process.argv[2];
const env = process.argv[3];
const buildNo = process.argv[4];

console.log('projecName:' + projectName);
console.log('env:' + env);
console.log('buildNo:' + buildNo);

const updateEnvironmentFile = () => {
  try {
    // environment.xxx.tsの更新
    const targetFile = `./apps/${projectName}/src/environments/environment.${env}.ts`;
    let lines = fs.readFileSync(targetFile, 'utf8');
    // buildNoを指定されたバージョンに変更
    if (lines.includes('assetsPath:')) {
      const newAssetsPath =
        buildNo === '' ? '' : `/static_app_contents/${buildNo}/`;
      lines = lines.replace(/assetsPath:.*/, `assetsPath: '${newAssetsPath}',`);
    }
    fs.writeFileSync(targetFile, lines, 'utf-8');

    // libs/csite-front/src/app/scss/abstracts_variables-env.scssの更新
    const variablesScssFile =
      './libs/csite-front/src/app/scss/abstracts/_variables-env.scss';
    lines = fs.readFileSync(variablesScssFile, 'utf-8');
    // $assetsPathを指定されたバージョンのPathに変更
    if (lines.includes('$assetsPath:')) {
      const newScssPath =
        buildNo === '' ? '^' : `/static_app_contents/${buildNo}/`;
      lines = lines.replace(
        /\$assetsPath:.*/,
        `$assetsPath: '${newScssPath}';`
      );
    }
    fs.writeFileSync(variablesScssFile, lines, 'utf-8');
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

module.exports = (context) => {
  updateEnvironmentFile();
};

updateEnvironmentFile();
