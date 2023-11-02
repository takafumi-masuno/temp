/** 会員基本取得APIのリクエスト */
export interface GetKaiinRequest {
  // パス
  path: {
    // 会員No
    kaiinNo: string;
  };
}

/**
 * 会員基本情報
 */
export interface IKaiin {
  kaiinNo: string;
  shogoName: string;
  shogoKana: string;
  postNo: string;
  todofukenName: string;
  cityName: string;
  townName: string;
  banchi: string;
  buildingName: string;
  stationName: string;
  railLineName: string;
  tohoJikan: number;
  basJikan: number;
  basteiName: string;
  basteiJikan: number;
  ippanTel: string;
  daihyoFax: string;
  daihyoshaName: string;
  menkyoName: string;
  shozokuDantaiName: string;
  hoshoKyokaiName: string;
  kotoriName: string;
  shihonkin: string;
  staffCnt: string;
  setsuritsuDate: string;
  teikyuDay: string;
  otherTeikyuDay: string;
  eigyoStartTime: string;
  eigyoEndTime: string;
  otherEigyoTime: string;
}

/**
 * 会員情報取得リクエスト
 */
export interface GetKaiinInfoRequest {
  kaiinNo: string;
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
