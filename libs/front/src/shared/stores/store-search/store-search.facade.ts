import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromStoreSearch from './store-search.reducer';
import * as StoreSearchSelectors from './store-search.selectors';
import * as StoreSearchActions from './store-search.actions';
import { State } from './store-search.reducer';

@Injectable()
export class StoreSearchFacade {
  state$ = this.store.pipe(select(StoreSearchSelectors.getState));
  search$ = this.store.pipe(select(StoreSearchSelectors.getSearch));

  constructor(private store: Store<fromStoreSearch.StoreSearchPartialState>) {}

  /** dispatch */
  setState(state: State) {
    this.store.dispatch(StoreSearchActions.setState({ state }));
  }

  setSearch(search: any) {
    this.store.dispatch(StoreSearchActions.setSearch(search));
  }
}
