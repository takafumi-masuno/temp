import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromStoreApp from './store-app.reducer';
import * as StoreAppSelectors from './store-app.selectors';
import * as StoreAppActions from './store-app.actions';
import { State } from './store-app.reducer';

@Injectable()
export class StoreAppFacade {
  state$ = this.store.pipe(select(StoreAppSelectors.getState));
  user$ = this.store.pipe(select(StoreAppSelectors.getUserState));
  isSession$ = this.store.pipe(select(StoreAppSelectors.getIsSessionState));

  constructor(private store: Store<fromStoreApp.StoreAppPartialState>) {}

  /** dispatch */
  setState(state: State) {
    this.store.dispatch(StoreAppActions.setState({ state }));
  }

  setUser(sessionId: string) {
    this.store.dispatch(StoreAppActions.getUser({ sessionId }));
  }

  setIsSession(sessionId: string) {
    this.store.dispatch(StoreAppActions.getIsSession({ sessionId }));
  }
}
