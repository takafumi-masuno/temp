/** panoramaログを送るリクエスト */
export interface PanoramaLogReq {
  // パス
  path: PanoramaPath;
  // クエリ
  query: PanoramaQuery;
}

/** panoramaログを送るリクエスト（パス） */
export interface PanoramaPath {
  // 物件コード
  bukkenCd: string;
}

/** panoramaログを送るリクエスト（パラメータ） */
export interface PanoramaQuery {
  // SEO 名（種目名）
  seoNm: string;
  // サブ SEO 名
  seoSub?: string;
  // SEO テーマ名（特集名）
  seoTheme?: string;
  // サイトコード
  siteCd: string;
}
