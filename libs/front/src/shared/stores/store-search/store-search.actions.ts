import { createAction, props } from '@ngrx/store';
import { State } from './store-search.reducer';
export const setState = createAction(
  '[StoreSearch] Set State',
  props<{ state: State }>()
);

export const setSearch = createAction('[StoreSearch] Set Search');

export const setLineSelected = createAction('[StoreSearch] Set Line Selected');

export const setStationSelectedList = createAction(
  '[StoreSearch] Set Station Selected List'
);

export const setCitySelectedList = createAction(
  '[StoreSearch] Set City Selected List'
);

export const setTownSelectedList = createAction(
  '[StoreSearch] Set Town Selected List'
);

export const setMapSelected = createAction('[StoreSearch] Set Map Selected');

export const setRoutemapSelected = createAction(
  '[StoreSearch] Set Routemap Selected'
);

export const setCommutingSelected = createAction(
  '[StoreSearch] Set Commuting Selected'
);

/** お気に入り追加 */
export const refreshSession = createAction('[StoreSearch] Refresh Session');

/** 条件保存 */
export const saveSearch = createAction('[StoreSearch] Save Search');

/** 条件保存成功 */
export const saveSearchSuccess = createAction(
  '[StoreSearch] Save Search Success'
);

/** 条件保存失敗 */
export const saveSearchError = createAction(
  '[StoreSearch] Save Search Error',
  props<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  }>()
);

/** お気に入り追加 */
export const addFavoriteId = createAction(
  '[StoreSearch] Add Favorite Id',
  props<{
    properties: { id: string; prefCd?: string }[];
    item: string;
    art: string;
  }>()
);

/** お気に入り削除 */
export const deleteFavoriteId = createAction(
  '[StoreSearch] Delete Favorite Id',
  props<{ bukkenIds: string; item: string; art: string }>()
);

/** 最近見た物件追加 */
export const addRecentId = createAction(
  '[StoreSearch] Add Recent Id',
  props<{ bukkenIds: string; item: string; art: string }>()
);

/** 条件保存 */
export const updatedConditionCount = createAction(
  '[StoreSearch] Update Condition Count',
  props<{ count: number }>()
);

/** お気に入り数更新 */
export const updatedFavoriteCount = createAction(
  '[AppSearch] Updated Favorite Count',
  props<{ count: number }>()
);

/** 最近見た物件数更新 */
export const updatedRecentBukkenCount = createAction(
  '[AppSearch] Updated Recent Bukken Count',
  props<{ count: number }>()
);

/** 物件の総数と会員の総数を取得する */
export const getBaseCount = createAction('[AppSearch] Get Base Count');
