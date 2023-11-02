export type EditCatalogRequest = {
  catalogId: number;
  shougou: string;
  catalogType: string;
  catalogMedia?: string;
  catalogNm: string;
  catalogGaiyou: string;
  catalogTag?: string;
  catalogGazou?: {
    file: File;
    path: string;
    name: string;
    src: string | ArrayBuffer;
  };
  koukaiJoutai: string;
};

export type EditCatalogApiRequest = {
  catalogId: number;
  shougou: string;
  catalogType: number;
  catalogMedia?: number;
  catalogNm: string;
  catalogGaiyou: string;
  catalogTag?: number[];
  catalogGazou?: {
    file: File;
    path: string;
    name: string;
    src: string | ArrayBuffer;
  };
  koukaiJoutai: number;
};

export type EditCatalogResponse<T = number | string> = {
  code: number;
  message: string;
  catalog: {
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
