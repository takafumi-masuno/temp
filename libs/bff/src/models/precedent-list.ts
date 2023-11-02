// 権限
export interface IPermission {
  permissions: {
    // ATユーザー権限
    atUserKengen: number;
    // 建築会社権限
    kenchikuKaishaUserKengen: number;
  };
}

// 一覧初期表示のユーザー情報
export interface IUserInfo {
  userInfo: {
    // ユーザーID
    userId: string;
    // ユーザー名
    nm: string;
    // 商号
    shougou?: string;
    // 商号カナ
    shougouKana?: string;
    // 店舗・モデルハウス名
    tenpoModelHouseNm?: string;
  };
}

export interface IPrecedentList {
  message: string;
  items: {
    total: number;
    page: number;
    precedentDataList: {
      kenchikuJireiId: number;
      shougou: string;
      image: string;
      price: number;
      kenchikuKouhou: number;
      shikichiMenseki: string;
      nobeyukaMenseki: string;
      shunkouNentuki: string;
      madoriKubun: number;
      koukaiJoutai: number;
    }[];
  };
}
