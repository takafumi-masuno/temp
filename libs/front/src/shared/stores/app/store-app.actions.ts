import { createAction, props } from '@ngrx/store';
import { State } from './store-app.reducer';
import { UserInfo, Permissions } from '../../models';

/** 条件保存 */
export const setState = createAction(
  '[StoreApp] Set State',
  props<{ state: State }>()
);

export const getIsSession = createAction(
  '[StoreApp Get Is Session]',
  props<{ sessionId: string }>()
);

export const setSession = createAction(
  '[StoreApp Set Is Session]',
  props<{ isSession: boolean }>()
);

export const getUser = createAction(
  '[StoreApp] Get User',
  props<{ sessionId: string }>()
);
export const gotUser = createAction(
  '[StoreApp] God User',
  props<{ info: UserInfo; permissions: Permissions }>()
);
