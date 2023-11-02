export type GetInfoListRequest<T = number | string> = {
  page?: number;
  count?: number;
  isPublish?: number;
  koukaiJoutai?: T;
  title?: string;
  sort?: string;
};

export type GetInfoListResponse<T = number | string> = {
  code: number;
  message: string;
  items?: {
    count: number;
    page: number;
    infoList: {
      oshiraseId: number;
      title: string;
      keisaiKikan: string;
      createDate: string;
      koukaiJoutai: T;
      juuyouHyouji?: number;
      isNew?: number;
    }[];
  };
};
