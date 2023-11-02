export interface Shougou {
  shougou: string;
  shougouKana: string;
}

export interface CatalogShougouResponse {
  code: number;
  message: string;
  items: {
    count: number;
    page: number;
    users: { shougou: string }[];
  };
}
