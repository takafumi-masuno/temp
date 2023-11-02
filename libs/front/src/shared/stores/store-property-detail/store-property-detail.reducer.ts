import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StorePropertyDetailActions from './store-property-detail.actions';
import { StorePropertyDetailEntity } from './store-property-detail.models';

export const STORE_PROPERTY_DETAIL_FEATURE_KEY = 'storePropertyDetail';

export interface State extends EntityState<StorePropertyDetailEntity> {
  bukkenCd: string;
  error?: string | null; // last known error (if any)
}

export interface StorePropertyDetailPartialState {
  readonly [STORE_PROPERTY_DETAIL_FEATURE_KEY]: State;
}

export const storePropertyDetailAdapter: EntityAdapter<StorePropertyDetailEntity> =
  createEntityAdapter<StorePropertyDetailEntity>();

export const initialState: State = storePropertyDetailAdapter.getInitialState({
  // set initial required properties
  bukkenCd: '00000000000',
  loaded: false,
});

const storePropertyDetailReducer = createReducer(
  initialState,
  on(StorePropertyDetailActions.setState, (_, { state }) => ({
    ...state,
  })),
  on(StorePropertyDetailActions.setBukkenCd, (state, { bukkenCd }) => ({
    ...state,
    bukkenCd,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return storePropertyDetailReducer(state, action);
}
