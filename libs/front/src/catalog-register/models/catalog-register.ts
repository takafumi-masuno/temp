export interface Catalog {
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
}

export interface CatalogRegisterResponse {
  code: number;
  message: string;
  catalog: Catalog;
}
