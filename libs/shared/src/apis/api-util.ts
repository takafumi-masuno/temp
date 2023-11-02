/**
 * URLのディレクトリ箇所を作成する
 * @param params サービスの引数（SERVICE含む）
 * @returns key=value を&で連結したパラメータ文字列
 */
export function createDirectory(directory: string[]): string {
  return directory.length ? '/' + directory.join('/') : '';
}

/**
 * POST用のパラメータを作成する
 * @param params サービスの引数（SERVICE含む）
 * @returns key=value を&で連結したパラメータ文字列
 */
export function createPostParam(params: {}): string {
  if (!params) return '';
  const param: string[] = [];
  const getParam = (key, value) => param.push(key + '=' + toSafetyChara(value));
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      if (key.endsWith('[]') && Array.isArray(params[key])) {
        params[key].forEach((val) => getParam(key, val));
      } else {
        getParam(key, params[key]);
      }
    }
  });

  return param.join('&');
}

/**
 * POSTデータで特定の文字がエラーとなってしまうため安全な文字に置き換える
 * @param original 元の文字列 or オブジェクト
 */
function toSafetyChara(original: any): string {
  //  / ? : @ $ , % # の文字もNGになりそうなものだが
  // 動作させて問題なかったため変換処理は行わない
  // ;(セミコロン)はURLencodeに習い%3Bに変換
  return (original + '')
    .replace(/\+/g, '＋')
    .replace(/=/g, '＝')
    .replace(/&/g, '＆')
    .replace(/;/g, '%3B');
}

/** nullやundefinedがparamsに存在する場合削除する */
export function deleteNullParams<T>(params: T) {
  for (const propName in params) {
    if (!params[propName]) {
      delete params[propName];
    }
  }
  return params;
}

export function serializeNestedObjects(params: object): object {
  for (const propName in params) {
    if (
      typeof params[propName] === 'object' &&
      !propName.endsWith('[]') &&
      !Array.isArray(params[propName])
    ) {
      params[propName] = JSON.stringify(params[propName]);
    }
  }
  return params;
}

/**
 * URLパラメータのエンコーダー
 * オリジナルでは'+'の記号をエスケープの対象外にしているが、今回はエスケープの対象とする。
 * オリジナル: https://github.com/angular/angular/blob/master/packages/common/http/src/params.ts#L32
 *
 * @param v 対象のパラメータキー、またはバリュー
 */
export function customEncoding(v: string): string {
  return (
    encodeURIComponent(v)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      // +はエスケープから外さない
      // .replace(/%2B/gi, '+')
      .replace(/%3D/gi, '=')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/')
  );
}

export const isUriEncoded = (data: string) =>
  data !== decodeURIComponent(data || '');

export const encodeUri = (data: string) =>
  isUriEncoded(data) ? data : encodeURIComponent(data || '');
