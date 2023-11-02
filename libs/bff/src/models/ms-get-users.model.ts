export interface Users {
  page?: number;
  count?: number;
  sort?: string;
  selectors?: string;
  shougou?: string;
  shougouKana?: string;
  nm?: string;
  tenpoNm?: string;
  userJoutai?: string;
}

export interface UsersGetRequest {
  query: {
    page?: number;
    count?: number;
    sort?: string;
    selectors?: string;
    shougou?: string;
    shougouKana?: string;
    nm?: string;
    tenpoNm?: string;
    status?: number;
  };
}

export type UsersGetResponse<T = number | string> = {
  code: number;
  message: string;
  items: {
    count: number;
    page: number;
    users: {
      userId?: string;
      shougou?: string;
      nm?: string;
      tenpoNm?: string;
      userJoutai?: T;
    }[];
  };
};
