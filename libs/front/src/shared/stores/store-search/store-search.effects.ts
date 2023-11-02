import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as actions from './store-search.actions';

@Injectable()
export class StoreSearchEffects {
  constructor(private store: Store, private actions$: Actions) {}

  // セッション情報更新
  refreshSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.refreshSession),
      concatMap(() => [
        actions.updatedConditionCount({
          count: 1,
        }),
      ])
    )
  );

  // 総物件数と総会員数を取得
  getBaseCount$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.getBaseCount))
  );

  // 最近見た物件を追加
  addRecentId$ = createEffect(
    () => this.actions$.pipe(ofType(actions.addRecentId)),
    { dispatch: false }
  );

  saveSearch$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.saveSearch))
  );

  // お気に入り追加
  addFavoriteId$ = createEffect(
    () => this.actions$.pipe(ofType(actions.addFavoriteId)),
    { dispatch: false }
  );

  // お気に入り削除
  removeFavoriteId$ = createEffect(
    () => this.actions$.pipe(ofType(actions.deleteFavoriteId)),
    { dispatch: false }
  );
}
