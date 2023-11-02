export interface CatalogDetail {
  shougou: string;
  catalogType: string;
  catalogMedia?: string;
  catalogNm: string;
  catalogGaiyou: string;
  catalogTag?: string[];
  catalogGazou?: {
    file: File;
    path: string;
    name: string;
    src: string | ArrayBuffer;
  };
  koukaiJoutai: string;
  updatedDate: string;
}

export interface CatalogDetailRequest {
  catalogId: number;
}

export interface CatalogDetailResponse {
  code: number;
  message: string;
  catalog: CatalogDetail;
}
