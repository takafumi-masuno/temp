import { ICityInfo } from './ms-city.model';
import { IKaiinInfo } from './ms-kaiin.model';

/**
 * 建築会社情報
 */
export interface ICompany {
  kenchikuKaishaInfo: ICompanyInfoDetail;
}

/**
 * 建築会社情報
 */
export interface ICompanyInfoDetail {
  kaiinNo: string;
  kaishaType: number;
  toriatsukaiKubun: number[];
  areaTodouhukenCd: number[];
  areaSikugunCd: number[][];
  areaBikou: string;
  tsubotankaFrom: string;
  tsubotankaTo: string;
  hontaikakakuFrom: string;
  hontaikakakuTo: string;
  afterServiceTeikiTenken?: string;
  kanseiHoshou?: string;
  kasiHoshou?: string;
  sonotaHoshou?: string;
  sekouJisseki?: string;
  sikakusya?: string;
  uriagedaka?: string;
  homePage?: string;
  kensetsuKyokaKubun?: number;
  kensetsuKyokaNo?: string;
  zimusyoTourokuNo?: string;
  tokuchouType?: number[];
  setsumeiTitle?: string;
  setsumeiShousai?: string;
  kaishaGazou1?: string;
  kaishaGazou2?: string;
  kaishaGazou3?: string;
  kaishaGazou4?: string;
  kaishaGazou5?: string;
  kaisyaDouga?: string;
  kodawariTitle1?: string;
  kodawariTitle2?: string;
  kodawariTitle3?: string;
  kodawariShousai1?: string;
  kodawariShousai2?: string;
  kodawariShousai3?: string;
  kodawariGazou1?: string;
  kodawariGazou2?: string;
  kodawariGazou3?: string;
  openStart: string;
  openEnd: string;
  koukaiJoutai: number;
  updatedDate: string;
}

/**
 * 建築会社情報取得リクエスト
 */
export interface GetCompanyReq {
  // パス
  path: GetCompanyPath;
  // クエリ
  query: GetCompanyQuery;
}

/**
 * 建築会社情報取得リクエスト（パスパラメーター）
 */
export interface GetCompanyPath {
  kenchikuKaishaId: number;
}

/**
 * 建築会社情報取得リクエスト（クエリパラメーター）
 */
export interface GetCompanyQuery {
  // 取得項目指定
  selectors: string;
}

/**
 * 建築会社情報取得リクエスト
 */
export interface GetCompanyInfoRequest {
  kenchikuKaishaId: number;
}

/**
 * 建築会社登録情報
 */
export interface ICompanyRegister {
  kaiinNo?: string;
  basicInfo?: IKaiinInfo;
  companyInfo?: ICompanyInfoDetail;
  visibilitySettings: IVisibilitySettings;
  updatedDate?: string;
}

/**
 * 建築会社情報
 */
export interface ICompanyInfo {
  companyProfile?: ICompanyProfile;
  companyImage?: ICompanyImage;
  companyMovie?: ICompanyMovie;
  companyAdvantage?: ICompanyAdvantage;
}

/**
 * 会社概要
 */
export interface ICompanyProfile {
  kaishaType: number;
  toriatsukaiKubun: number[];
  area: {
    areaTodouhukenCd: number;
    areaSikugunCd: number[];
  }[];
  areaBikou: string;
  tsubotankaFrom: string;
  tsubotankaTo: string;
  hontaikakakuFrom: string;
  hontaikakakuTo: string;
  afterServiceTeikiTenken: string;
  kanseiHoshou: string;
  kasiHoshou: string;
  sonotaHoshou: string;
  sekouJisseki: string;
  sikakusya: string;
  uriagedaka: string;
  homePage: string;
  kensetsuKyokaKubun: number;
  kensetsuKyokaNo: string;
  zimusyoTourokuNo: string;
  tokuchouType: string[];
  setsumeiTitle: string;
  setsumeiShousai: string;
}

/**
 * 会社画像
 */
export interface ICompanyImage {
  kaishaGazou1: string;
  kaishaGazou2: string;
  kaishaGazou3: string;
  kaishaGazou4: string;
  kaishaGazou5: string;
}

/**
 * 会社紹介・メッセージ動画
 */
export interface ICompanyMovie {
  kaishaDouga: string;
}

/**
 * 会社のつよみ
 */
export interface ICompanyAdvantage {
  kodawari1: {
    title: string;
    shousai: string;
    gazou: string;
  };
  kodawari2: {
    title: string;
    shousai: string;
    gazou: string;
  };
  kodawari3: {
    title: string;
    shousai: string;
    gazou: string;
  };
}

/**
 * 公開設定
 */
export interface IVisibilitySettings {
  openStart: string;
  openEnd: string;
  koukaiJoutai: number;
}

/**
 * 建築会社情報登録リクエスト
 */
export interface RegisterCompanyRequest {
  kenchikuKaishaInfo: {
    kaishaType: number;
    toriatsukaiKubun: number[];
    areaTodouhukenCd: number[];
    areaSikugunCd: number[][];
    areaBikou: string;
    tsubotankaFrom: string;
    tsubotankaTo: string;
    hontaikakakuFrom: string;
    hontaikakakuTo: string;
    afterServiceTeikiTenken?: string;
    kanseiHoshou?: string;
    kasiHoshou?: string;
    sonotaHoshou?: string;
    sekouJisseki?: string;
    sikakusya?: string;
    uriagedaka?: string;
    homePage?: string;
    kensetsuKyokaKubun?: number;
    kensetsuKyokaNo?: string;
    zimusyoTourokuNo?: string;
    tokuchouType?: number[];
    setsumeiTitle?: string;
    setsumeiShousai?: string;
    kaishaGazou1?: string;
    kaishaGazou2?: string;
    kaishaGazou3?: string;
    kaishaGazou4?: string;
    kaishaGazou5?: string;
    kaisyaDouga?: string;
    kodawariTitle1?: string;
    kodawariTitle2?: string;
    kodawariTitle3?: string;
    kodawariShousai1?: string;
    kodawariShousai2?: string;
    kodawariShousai3?: string;
    kodawariGazou1?: string;
    kodawariGazou2?: string;
    kodawariGazou3?: string;
    openStart: string;
    openEnd: string;
    koukaiJoutai: number;
  };
  deleteKaishaDouga?: string[];
}

/**
 * 建築会社詳細レスポンス
 */
export interface ICompanyDetailResponse {
  basicInfo?: IKaiinInfo;
  companyInfo?: ICompanyInfoForCompanyDetail;
}

/**
 * 建築会社詳細画面の建築会社情報
 */
export interface ICompanyInfoForCompanyDetail {
  kaishaType: string;
  toriatsukaiKubun: string;
  areaTodouhukenCd: number[];
  areaSikugunCd: string[][];
  areaBikou: string;
  tsubotankaFrom: string;
  tsubotankaTo: string;
  hontaikakakuFrom: string;
  hontaikakakuTo: string;
  afterServiceTeikiTenken?: string;
  kanseiHoshou?: string;
  kasiHoshou?: string;
  sonotaHoshou?: string;
  sekouJisseki?: string;
  sikakusya?: string;
  uriagedaka?: string;
  homePage?: string;
  kensetsuKyokaKubun?: string;
  kensetsuKyokaNo?: string;
  zimusyoTourokuNo?: string;
  tokuchouType?: string[];
  setsumeiTitle?: string;
  setsumeiShousai?: string;
  kaishaGazou1?: string;
  kaishaGazou2?: string;
  kaishaGazou3?: string;
  kaishaGazou4?: string;
  kaishaGazou5?: string;
  kaisyaDouga?: string;
  kodawariTitle1?: string;
  kodawariTitle2?: string;
  kodawariTitle3?: string;
  kodawariShousai1?: string;
  kodawariShousai2?: string;
  kodawariShousai3?: string;
  kodawariGazou1?: string;
  kodawariGazou2?: string;
  kodawariGazou3?: string;
  openStart: string;
  openEnd: string;
  koukaiJoutai: string;
}

/**
 * 建築会社情報削除リクエスト
 */
export interface DeleteCompanyReq {
  // パス
  path: DeleteCompanyPath;
}

/**
 * 建築会社情報削除リクエスト（パスパラメーター）
 */
export interface DeleteCompanyPath {
  kenchikuKaishaId: number;
}

/**
 * 建築会社変更レスポンス
 */
export interface ICompanyEditResponse {
  basicInfo?: IKaiinInfo;
  companyInfo?: ICompanyInfoForCompanyEdit;
}

/**
 * 建築会社変更画面の建築会社情報
 */
export interface ICompanyInfoForCompanyEdit {
  kaishaType: number;
  toriatsukaiKubun: number[];
  areaTodouhukenCd: string[];
  areaSikugunCd: ICityInfo[][];
  areaSikugunNm: string[][];
  areaBikou: string;
  tsubotankaFrom: string;
  tsubotankaTo: string;
  hontaikakakuFrom: string;
  hontaikakakuTo: string;
  afterServiceTeikiTenken?: string;
  kanseiHoshou?: string;
  kasiHoshou?: string;
  sonotaHoshou?: string;
  sekouJisseki?: string;
  sikakusya?: string;
  uriagedaka?: string;
  homePage?: string;
  kensetsuKyokaKubun?: number;
  kensetsuKyokaNo?: string;
  zimusyoTourokuNo?: string;
  tokuchouType?: number[];
  setsumeiTitle?: string;
  setsumeiShousai?: string;
  kaishaGazou1?: string;
  kaishaGazou2?: string;
  kaishaGazou3?: string;
  kaishaGazou4?: string;
  kaishaGazou5?: string;
  kaisyaDouga?: string;
  kodawariTitle1?: string;
  kodawariTitle2?: string;
  kodawariTitle3?: string;
  kodawariShousai1?: string;
  kodawariShousai2?: string;
  kodawariShousai3?: string;
  kodawariGazou1?: string;
  kodawariGazou2?: string;
  kodawariGazou3?: string;
  openStart: string;
  openEnd: string;
  koukaiJoutai: number;
  updatedDate: string;
}
