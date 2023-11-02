export interface CatalogDetailRequest {
  catalogId: number;
}

export type CatalogDetailResponse<T = number | string> = {
  code: number;
  message: string;
  catalog?: {
    shougou: string;
    catalogType: T;
    catalogMedia?: T;
    catalogNm: string;
    catalogGaiyou: string;
    catalogTag?: T[];
    catalogGazou?: {
      file: File;
      path: string;
      name: string;
      src: string | ArrayBuffer;
    };
    koukaiJoutai: T;
  };
};
