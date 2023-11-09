import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORESEARCH_FEATURE_KEY, State } from './store-search.reducer';

// Lookup the 'StoreSearch' feature state managed by NgRx
export const getStoreSearchState = createFeatureSelector<State>(
  STORESEARCH_FEATURE_KEY
);

export const getState = createSelector(
  getStoreSearchState,
  (state: State) => state
);

export const getSearch = createSelector(
  getStoreSearchState,
  (state: State) => state.search
);
