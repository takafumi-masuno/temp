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

export const getFavObject = createSelector(
  getStoreSearchState,
  (state: State) => state.favObject
);
export const getFavCount = createSelector(
  getStoreSearchState,
  (state: State) => state.favCount
);
export const getConditionCount = createSelector(
  getStoreSearchState,
  (state: State) => state.conditionCount
);
export const getRecentObject = createSelector(
  getStoreSearchState,
  (state: State) => state.recentObject
);
export const getRecentCount = createSelector(
  getStoreSearchState,
  (state: State) => state.recentCount
);
