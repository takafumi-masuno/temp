/** パノラマのログのリクエスト */
export interface PanoramaLogRequest {
  // SEO 名（種目名）
  seoNm: string;
  // サブ SEO 名
  seoSub?: string;
  // SEO テーマ名（特集名）
  seoTheme?: string;

  /** 物件番号 */
  bukkenNo: string;
  /** サイトコード */
  siteCd: string;
}
