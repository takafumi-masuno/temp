import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StoreSearchActions from './store-search.actions';
import { StoreSearchEntity } from './store-search.models';

export const STORESEARCH_FEATURE_KEY = 'storeSearch';

export interface State extends EntityState<StoreSearchEntity> {
  search: any;
}

export interface StoreSearchPartialState {
  readonly [STORESEARCH_FEATURE_KEY]: State;
}

export const storeSearchAdapter: EntityAdapter<StoreSearchEntity> =
  createEntityAdapter<StoreSearchEntity>();

export const initialState: State = storeSearchAdapter.getInitialState({
  search: null,
});

const storeSearchReducer = createReducer(
  initialState,
  on(StoreSearchActions.setSearch, (state, search) => ({
    ...state,
    search: search,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return storeSearchReducer(state, action);
}
