export type GetPermissionsResponse = {
  atUser?: {
    roll: number;
    permission: number;
  };
  kenchikuKaishaUser?: {
    roll: number;
    conversionView: number;
    conversionReception: number;
  };
};
