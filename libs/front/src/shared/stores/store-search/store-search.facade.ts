import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromStoreSearch from './store-search.reducer';
import * as StoreSearchSelectors from './store-search.selectors';
import * as StoreSearchActions from './store-search.actions';
import { State } from './store-search.reducer';
import { Actions } from '@ngrx/effects';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class StoreSearchFacade {
  state$ = this.store.pipe(select(StoreSearchSelectors.getState));
  search$ = this.store.pipe(select(StoreSearchSelectors.getSearch));
  favObject$ = this.store.pipe(select(StoreSearchSelectors.getFavObject));
  favCount$ = this.store.pipe(select(StoreSearchSelectors.getFavCount));
  recentObject$ = this.store.pipe(select(StoreSearchSelectors.getRecentObject));
  recentCount$ = this.store.pipe(select(StoreSearchSelectors.getRecentCount));

  constructor(
    private store: Store<fromStoreSearch.StoreSearchPartialState>,
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: unknown
  ) {}

  // 物件総数と会員総数を取得
  getBaseCount() {
    this.store.dispatch(StoreSearchActions.getBaseCount());
  }

  /** dispatch */
  setState(state: State) {
    this.store.dispatch(StoreSearchActions.setState({ state }));
  }

  /**
   * 最近見た物件登録
   */
  addRecent(params: { ids: string; item: string; art: string }) {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(
        StoreSearchActions.addRecentId({
          bukkenIds: params.ids,
          item: params.item,
          art: params.art,
        })
      );
    }
  }

  // お気に入り追加
  addFav(params: {
    properties: { id: string; prefCd?: string }[];
    item: string;
    art: string;
  }) {
    this.store.dispatch(
      StoreSearchActions.addFavoriteId({
        properties: params.properties,
        item: params.item,
        art: params.art,
      })
    );
  }

  // お気に入り削除
  deleteFav(params: { ids: string; item: string; art: string }) {
    this.store.dispatch(
      StoreSearchActions.deleteFavoriteId({
        bukkenIds: params.ids,
        item: params.item,
        art: params.art,
      })
    );
  }

  /** セッションの各件数を更新 */
  refreshSession() {
    this.store.dispatch(StoreSearchActions.refreshSession());
  }

  // 条件保存数更新
  updatedConditionCount(count: number) {
    this.store.dispatch(StoreSearchActions.updatedConditionCount({ count }));
  }
}
