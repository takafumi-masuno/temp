import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_APP_FEATURE_KEY, State } from './store-app.reducer';

// Lookup the 'StoreApp' feature state managed by NgRx
export const getStoreAppState = createFeatureSelector<State>(
  STORE_APP_FEATURE_KEY
);

export const getState = createSelector(
  getStoreAppState,
  (state: State) => state
);

export const getUserState = createSelector(
  getStoreAppState,
  (state: State) => state.user
);

export const getIsSessionState = createSelector(
  getStoreAppState,
  (state: State) => state.isSession
);
