export type InfoList = {
  oshiraseId: number;
  title: string;
  keisaiKikan: string;
  createDate: string;
  koukaiJoutai: string;
  juuyouHyouji?: number;
  isNew?: number;
}[];

export interface InfoListSearchRequest {
  page?: number;
  count?: number;
  isPublish?: number;
  koukaiJoutai?: string;
  title?: string;
  sort?: string;
}

export interface InfoListSearchResponse {
  code: number;
  message: string;
  items: {
    count: number;
    page: number;
    infoList: InfoList;
  };
}
