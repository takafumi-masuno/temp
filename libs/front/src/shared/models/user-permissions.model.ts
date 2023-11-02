export type UserPermissions = {
  atUserKengen?: number;
  kenchikuKaishaUserKengen?: number;
};

export type UserPermissionsRequest = {
  selectors?: string;
};

export type UserPermissionsResponse = UserPermissions;
