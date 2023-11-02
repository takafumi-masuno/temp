/**
 * 建築会社一覧取得のリクエスト
 */
export interface GetCompaniesReq {
  // クエリ
  query: GetCompaniesQuery;
}

/**
 * 建築会社一覧取得APIのリクエストのQueryモデル
 */
export interface GetCompaniesQuery {
  selectors: string;
  kaiinNo: string;
  shougou: string;
  shougouKana: string;
  tel: string;
  koukaiJoutai: number;
  sort: string;
  order: string;
  page: number;
  limitPerPage: number;
}

/**
 * 建築会社一覧取得APIのレスポンス
 */
export interface GetCompaniesRes {
  total: number;
  page: number;
  companies: Company[];
}

/**
 * 建築会社情報
 */
export interface Company {
  kenchikuKaishaId: number;
  shougou: string;
  kaishaType: number;
  yuubinNo: string;
  shozaichi: string;
  tel: string;
  koukaiJoutai: number;
}

/**
 * 建築会社一覧取得リクエスト
 */
export class GetCompaniesRequest {
  kaiinNo?: string;
  shougou?: string;
  shougouKana?: string;
  tel?: string;
  koukaiJoutai?: number;
  sort?: string;
  order?: string;
  page: number;
  limitPerPage: number;
}

/**
 * 建築会社一覧検索結果
 */
export interface ICompanySearchResult {
  total: number;
  page: number;
  companies: ICompanyListItem[];
}

/**
 * 建築会社情報
 */
export interface ICompanyListItem {
  shougou: string;
  kaishaType: string;
  yuubinNo: string;
  shozaichi: string;
  tel: string;
  koukaiJoutai: string;
  detail: number;
}
