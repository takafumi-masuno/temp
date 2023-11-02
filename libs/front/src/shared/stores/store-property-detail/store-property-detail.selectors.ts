import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STORE_PROPERTY_DETAIL_FEATURE_KEY,
  State,
} from './store-property-detail.reducer';

// Lookup the 'StorePropertyDetail' feature state managed by NgRx
export const getStorePropertyDetailState = createFeatureSelector<State>(
  STORE_PROPERTY_DETAIL_FEATURE_KEY
);

// const { selectAll, selectEntities } = storePropertyDetailAdapter.getSelectors();

export const getState = createSelector(
  getStorePropertyDetailState,
  (state: State) => state
);

export const getBukkenCd = createSelector(
  getStorePropertyDetailState,
  (state: State) => state.bukkenCd
);
