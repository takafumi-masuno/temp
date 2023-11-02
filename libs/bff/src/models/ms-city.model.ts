/**
 * 市区郡情報取得リクエスト
 */
export interface GetCityInfoRequest {
  prefectureCode: string;
}

/**
 * 市区郡取得リクエスト
 */
export interface GetCitiesReq {
  // パスパラメータ
  path: GetCitiesPath;
}

/**
 * 市区郡取得リクエスト（パスパラメーター）
 */
export interface GetCitiesPath {
  prefectureCode: string;
}

/**
 * 市区郡取得レスポンス
 */
export interface GetCitiesRes {
  cities: ICityInfo[];
}

/**
 * 市区郡情報
 */
export interface ICityInfo {
  /** 市区郡名 */
  name: string;
  /** 市区郡ローマ字 */
  roman: string;
  /** 市区郡コード */
  code: string;
}

/**
 * 市区郡一覧取得リクエスト
 */
export interface GetCityListReq {
  // パスパラメータ
  path: GetCityListPath;
}

/**
 * 市区郡一覧取得リクエスト（パスパラメーター）
 */
export interface GetCityListPath {
  todouhukenCd: number[];
  sikugunCd: number[][];
}

/**
 * 市区郡一覧取得レスポンス
 */
export interface GetCityListRes {
  prefectures: number[];
  cities: ICityInfo[][];
}
