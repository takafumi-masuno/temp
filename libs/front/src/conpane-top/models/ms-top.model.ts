export interface GetHogeRequest {
  path: GetHogePath;
  query: GetHogeQuery;
}

export interface GetHogePath {
  version: string;
}

export interface GetHogeQuery {
  hoge: string;
}

export interface GetHogeResponse {
  hoge: string;
  fuga: string;
}
