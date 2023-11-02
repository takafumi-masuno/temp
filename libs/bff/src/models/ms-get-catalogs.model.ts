export type GetCatalogsRequest<T = string | number> = {
  page?: number;
  count?: number;
  selectors?: string;
  isNew?: number;
  sort?: string;
  order?: 'ASC' | 'DESC' | 'asc' | 'desc';
  shougou: string;
  catalogNm?: string;
  catalogType?: T;
  catalogMedia?: T;
  koukaiJoutai?: T;
  catalogTag?: T[];
};

export type GetCatalogsResponse<T = number | string> = {
  count?: number;
  page?: number;
  total?: number;
  catalogDataList?: {
    catalogId: number;
    shougou: string;
    catalogNm: string;
    catalogGaiyou: string;
    catalogType: T;
    catalogMedia: T;
    catalogTag: T[];
    koukaiJoutai: T;
  }[];
  detail?: string;
};
