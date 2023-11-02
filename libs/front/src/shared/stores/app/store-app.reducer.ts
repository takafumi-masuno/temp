import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StoreAppActions from './store-app.actions';
import { StoreAppEntity } from './store-app.models';
import { UserInfo, Permissions } from '../../models';

export const STORE_APP_FEATURE_KEY = 'storeApp';

export interface State {
  user: {
    info: UserInfo;
    permissions: Permissions;
  };
  isSession: boolean;
}

export interface StoreAppPartialState {
  readonly [STORE_APP_FEATURE_KEY]: State;
}

export const storeAppAdapter: EntityAdapter<StoreAppEntity> =
  createEntityAdapter<StoreAppEntity>();

export const initialState: State = storeAppAdapter.getInitialState({
  user: null,
  isSession: null,
});

const storeAppReducer = createReducer(
  initialState,
  on(StoreAppActions.gotUser, (state, user) => ({
    ...state,
    user: user,
  })),
  on(StoreAppActions.setSession, (state, session) => ({
    ...state,
    isSession: session.isSession,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return storeAppReducer(state, action);
}
