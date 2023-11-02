import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StoreSearchActions from './store-search.actions';
import { StoreSearchEntity } from './store-search.models';
export const STORESEARCH_FEATURE_KEY = 'storeSearch';

export interface State extends EntityState<StoreSearchEntity> {
  error?: string | null; // last known error (if any)
  // お気に入り物件を保持
  search?: any;
  favObject: { [key: string]: boolean };
  recentObject: { [key: string]: boolean };

  // 条件保存数
  conditionCount: number;
  /** 最近見た数 */
  recentCount: number;
  /** お気に入り物件数 */
  favCount: number;
}

export interface StoreSearchPartialState {
  readonly [STORESEARCH_FEATURE_KEY]: State;
}

export const storeSearchAdapter: EntityAdapter<StoreSearchEntity> =
  createEntityAdapter<StoreSearchEntity>();

export const initialState: State = storeSearchAdapter.getInitialState({
  baseCount: null,
  search: null,
  favObject: {},
  favArray: null,
  recentArray: null,
  recentObject: {},
  conditionCount: null,
  recentCount: null,
  favCount: null,
});

const storeSearchReducer = createReducer(
  initialState,
  on(StoreSearchActions.setState, (_, { state }) => ({
    ...state,
  })),
  // 条件保存
  on(StoreSearchActions.updatedConditionCount, (state, { count }) => ({
    ...state,
    conditionCount: count,
  })),
  on(StoreSearchActions.updatedFavoriteCount, (state, { count }) => ({
    ...state,
    favCount: count,
  })),
  on(StoreSearchActions.updatedRecentBukkenCount, (state, { count }) => ({
    ...state,
    recentCount: count,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return storeSearchReducer(state, action);
}
