export interface IFvPrecedentFirstView {
  atUserKengen: boolean;
  kenchikuKaishaUserKengen: boolean;
  userInfo?: {
    userId: string;
    nm: string;
    shougou: string;
    shougouKana: string;
    tenpoModelHouseNm: string;
  };
}

export interface PrecedentListResponse {
  message: string;
  items: {
    total: number;
    page: number;
    precedentDataList: {
      kenchikuJireiId: number;
      shougou: string;
      image: string;
      price: number;
      kenchikuKouhou: string;
      shikichiMenseki: string;
      nobeyukaMenseki: string;
      shunkouNentuki: string;
      madoriKubun: string;
      koukaiJoutai: string;
    }[];
  };
}

export interface PrecedentListRequest {
  page?: number;
  cnt_precedents?: number;
  selectors?: string;
  sort?: string;

  shougou: string;
  shougouKana?: string;
  kenchikuKouhou?: number;
  kakakutaiFrom?: number;
  kakakutaiTo?: number;
  shunkouNentukiFrom?: string;
  shunkouNentukiTo?: string;
  madoriKubun?: number;
  koukaiJoutai?: number;
}
