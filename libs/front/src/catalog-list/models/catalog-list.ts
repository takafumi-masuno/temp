export interface CatalogListSearchRequest {
  page?: number;
  count?: number;
  selectors?: string;
  isNew?: number;
  sort?: string;
  order?: 'DESC' | 'ASC' | 'desc' | 'asc';
  shougou: string;
  catalogNm?: string;
  catalogType?: string;
  catalogMedia?: string;
  koukaiJoutai?: string;
  catalogTag?: string[];
}

export interface CatalogListSearchResponse {
  count?: number;
  page?: number;
  total?: number;
  catalogDataList?: {
    catalogId: number;
    shougou: string;
    catalogNm: string;
    catalogGaiyou: string;
    catalogType: string;
    catalogMedia: string;
    catalogTag: string[];
    koukaiJoutai: string;
  }[];
  detail?: string;
}
