import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromStorePropertyDetail from './store-property-detail.reducer';
import * as StorePropertyDetailSelectors from './store-property-detail.selectors';
import * as StorePropertyDetailActions from './store-property-detail.actions';
import { State } from './store-property-detail.reducer';
@Injectable()
export class StorePropertyDetailFacade {
  state$ = this.store.pipe(select(StorePropertyDetailSelectors.getState));
  bukkenCd$ = this.store.pipe(select(StorePropertyDetailSelectors.getBukkenCd));

  constructor(
    private store: Store<fromStorePropertyDetail.StorePropertyDetailPartialState>
  ) {}

  /** dispatch */
  setState(state: State) {
    this.store.dispatch(StorePropertyDetailActions.setState({ state }));
  }

  /** common */
  setBukkenCd(bukkenCd: string) {
    this.store.dispatch(StorePropertyDetailActions.setBukkenCd({ bukkenCd }));
  }
}
