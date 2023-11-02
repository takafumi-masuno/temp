import { UserInfo } from './user-info.model';
import { UserPermissions } from './user-permissions.model';

export type User = {
  info: UserInfo;
  permissions: UserPermissions;
};
