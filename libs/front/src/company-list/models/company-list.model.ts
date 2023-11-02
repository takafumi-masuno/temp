/**
 * 建築会社一覧情報
 */
export interface IFvCompanyList {
  companySearchResult: ICompanySearchResult;
}

/**
 * 建築会社一覧検索結果
 */
export interface ICompanySearchResult {
  total: number;
  page: number;
  companies: ICompany[];
}

/**
 * 建築会社情報
 */
export interface ICompany {
  shougou: string;
  kaishaType: string;
  yuubinNo: string;
  shozaichi: string;
  tel: string;
  koukaiJoutai: string;
  detail: number;
}

/**
 * 検索条件
 */
export interface ICompanySearchConditions {
  searchKaiinNo?: string;
  searchShougou?: string;
  searchShougouKana?: string;
  searchTel?: string;
  selectValue?: number;
  config: IConfig;
}

/**
 * 検索キーワード
 */
export interface ISearchConditions {
  searchKaiinNo?: string;
  searchShougou?: string;
  searchShougouKana?: string;
  searchTel?: string;
  selectValue?: number;
}

/**
 * 設定情報
 */
export interface IConfig {
  sort?: string;
  order?: string;
  page?: number;
  limitPerPage?: number;
}

/**
 * エラー通知情報
 */
export interface IErrorNotice {
  code: number;
  message: string;
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
