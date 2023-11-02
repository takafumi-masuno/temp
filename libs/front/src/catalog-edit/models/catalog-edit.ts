export interface CatalogEditRequest {
  catalogId: number;
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

export interface CatalogEditResponse {
  code: number;
  message: string;
  catalog: {
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
  };
}
