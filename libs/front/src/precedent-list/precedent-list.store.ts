// データの状態管理
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrecedentListService } from '@front/precedent-list/service/precedent-list.service';
import {
  PrecedentListRequest,
  IFvPrecedentFirstView,
  PrecedentListResponse,
} from './model/precedent-list';
import { ActivatedRoute } from '@angular/router';

export interface PrecedentListState {
  view: IFvPrecedentFirstView;
  result: PrecedentListResponse['items'];
  error?: boolean;
}

@Injectable()
export class PrecedentListStore extends ComponentStore<PrecedentListState> {
  constructor(
    private route: ActivatedRoute,
    private precedentListService: PrecedentListService
  ) {
    super({
      view: null,
      result: null,
    });

    this.route.data
      .pipe(
        map((data) => data.view),
        takeUntil(this.destroy$)
      )
      .subscribe((view) => {
        this.setFirstView(view);
      });
  }

  /**
   *  select
   */
  // 初期表示
  readonly view$: Observable<IFvPrecedentFirstView> = this.select(
    (state) => state.view
  );
  // 検索結果
  readonly result$: Observable<PrecedentListResponse['items']> = this.select(
    (state) => state.result
  );

  /**
   *  updater
   */
  // 初期表示を設定
  readonly setFirstView = this.updater<IFvPrecedentFirstView>(
    (state, view) => ({
      ...state,
      view,
    })
  );

  // 検索結果を設定
  readonly setResult = this.updater<PrecedentListResponse['items']>(
    (state, result) => ({
      ...state,
      result,
    })
  );

  /**
   *  effect
   */
  // 建築事例一覧を検索
  readonly searchPrecedentList = this.effect(
    (request$: Observable<PrecedentListRequest>) =>
      request$.pipe(
        switchMap((request) =>
          this.precedentListService.searchPrecedentList(request).pipe(
            tapResponse(
              (result) => {
                this.setResult(result.items);
              },
              // TODO エラー処理
              (e) => {
                console.log(e);
              }
            )
          )
        )
      )
  );
}
