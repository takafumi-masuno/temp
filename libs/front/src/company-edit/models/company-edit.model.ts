import { SegmentType } from '../../shared/constants';
import { IPrefecture, ICityInfo } from '../../shared/models';

/**
 * 建築会社登録情報
 */
export interface ICompanyRegister {
  kaiinNo?: string;
  basicInfo?: IKaiinInfo;
  companyInfo?: ICompanyInfo;
  visibilitySettings: IVisibilitySettings;
  updatedDate?: string;
}

/**
 * 建築会社変更レスポンス
 */
export interface ICompanyEditResponse {
  basicInfo?: IKaiinInfo;
  companyInfo?: ICompanyInfoForCompanyEdit;
}

/**
 * 会員情報
 */
export interface IKaiinInfo {
  kaiinNo: string;
  ippanShougou: string;
  ippanShougouKana: string;
  postNo: string;
  shozaichi: string;
  koutuu: string;
  tel: string;
  fax: string;
  daihyoushaNm: string;
  menkyoNm: string;
  shozokuDantaiNm: string;
  hoshouKaisha: string;
  koutoriKamei: string;
  shihonkin: string;
  jugyouinsuu: string;
  seturituNentsuki: string;
  teikyuubi: string;
  sonotaTeikyuubi: string;
  eigyouZikan: string;
  sonotaEigyouZikan: string;
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
  kaishaDouga?: string;
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
 * 建築会社情報
 */
export interface ICompanyInfo {
  kaishaType: number;
  toriatsukaiKubun: number[];
  area: string[];
  areaTodouhukenCd: string[];
  areaSikugunCd: ICityInfo[][];
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
  kaishaGazou1FileName?: string;
  kaishaGazou2?: string;
  kaishaGazou2FileName?: string;
  kaishaGazou3?: string;
  kaishaGazou3FileName?: string;
  kaishaGazou4?: string;
  kaishaGazou4FileName?: string;
  kaishaGazou5?: string;
  kaishaGazou5FileName?: string;
  kaishaDouga?: string;
  kaishaDougaFileName?: string;
  kodawariTitle1?: string;
  kodawariTitle2?: string;
  kodawariTitle3?: string;
  kodawariShousai1?: string;
  kodawariShousai2?: string;
  kodawariShousai3?: string;
  kodawariGazou1?: string;
  kodawariGazou1FileName?: string;
  kodawariGazou2?: string;
  kodawariGazou2FileName?: string;
  kodawariGazou3?: string;
  kodawariGazou3FileName?: string;
  openStart: string;
  openEnd: string;
  koukaiJoutai: number;
}

/**
 * 会社概要
 */
export interface ICompanyProfile {
  kaishaType?: number;
  toriatsukaiKubun?: number[];
  areaTodouhukenCd?: string[];
  areaSikugunCd?: string[][];
  areaBikou?: string;
  tsubotankaFrom?: number;
  tsubotankaTo?: number;
  hontaikakakuFrom?: number;
  hontaikakakuTo?: number;
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
}

/**
 * 会社画像
 */
export interface ICompanyImage {
  kaishaGazou1?: string;
  kaishaGazou2?: string;
  kaishaGazou3?: string;
  kaishaGazou4?: string;
  kaishaGazou5?: string;
}

/**
 * 会社紹介・メッセージ動画
 */
export interface ICompanyMovie {
  kaishaDouga?: string;
}

/**
 * 会社のつよみ
 */
export interface ICompanyAdvantage {
  kodawari1?: {
    title?: string;
    shousai?: string;
    gazou?: string;
  };
  kodawari2?: {
    title?: string;
    shousai?: string;
    gazou?: string;
  };
  kodawari3?: {
    title?: string;
    shousai?: string;
    gazou?: string;
  };
}

/**
 * 公開設定
 */
export interface IVisibilitySettings {
  openStart: string;
  openEndSelection?: boolean;
  openEnd: string;
  koukaiJoutai: number;
}

/**
 * 建築会社ID取得リクエスト
 */
export interface GetCompanyIdRequest {
  userId: string;
}

/**
 * 会員情報取得リクエスト
 */
export interface GetKaiinInfoRequest {
  kaiinNo: string;
}

/**
 * 建築会社情報取得リクエスト
 */
export interface GetCompanyInfoRequest {
  kenchikuKaishaId: number;
}

/**
 * 市区郡情報取得リクエスト
 */
export interface GetCityInfoRequest {
  prefectureCode: string;
}

/**
 * 建築会社情報登録リクエスト
 */
export interface RegisterCompanyRequest {
  kenchikuKaishaInfo: {
    kaishaType: number;
    toriatsukaiKubun: number[];
    areaTodouhukenCd: string[];
    areaSikugunCd: string[][];
    areaBikou: string;
    tsubotankaFrom: number;
    tsubotankaTo: number;
    hontaikakakuFrom: number;
    hontaikakakuTo: number;
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
    kaishaDouga?: string;
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
  deleteFiles?: {
    list: string[];
  };
}

/**
 * 建築会社登録リクエスト
 */
export interface IRegisterCompanyRequest {
  companyProfile?: ICompanyProfile;
  companyImage?: ICompanyImage;
  companyAdvantage?: ICompanyAdvantage;
  visibilitySettings: IVisibilitySettings;
}

/**
 * 選択中の市区郡情報
 */
export interface ISelectedCityInfo extends ICityInfo {
  isChecked: boolean;
}

/**
 * 選択中の施工対応エリア
 */
export interface ISelectedArea {
  prefecture: IPrefecture;
  cities: ISelectedCityInfo[];
}

/**
 * 動画アップロードレスポンス
 */
export interface IUploadVideoResponse {
  progress: number;
  url: string;
}

/**
 * 削除ファイルリクエスト
 */
export interface IDeleteFileRequest {
  deleteList: string[];
}

export interface ITokuchouType extends SegmentType {
  isChecked: boolean;
}
