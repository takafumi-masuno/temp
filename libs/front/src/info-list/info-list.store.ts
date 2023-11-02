import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { InfoListSearchService } from './services';
import { Observable, map, switchMap } from 'rxjs';
import { InfoListSearchRequest, InfoList } from './models';

interface InfoListState {
  total: number;
  page: number;
  displayNum: number;
  error: {
    code: number;
    message: string;
  };
  infoList: InfoList;
}

@Injectable()
export class InfoListStore extends ComponentStore<InfoListState> {
  constructor(private infoListSearchService: InfoListSearchService) {
    super({
      total: 0,
      page: 0,
      displayNum: 10,
      error: null,
      infoList: null,
    });
  }

  readonly total$: Observable<number> = this.select((state) => state.total);
  readonly page$: Observable<number> = this.select((state) => state.page);
  readonly displayNum$: Observable<number> = this.select(
    (state) => state.displayNum
  );
  readonly error$: Observable<{ code: number; message: string }> = this.select(
    (state) => state.error
  );
  readonly infoList$: Observable<InfoList> = this.select(
    (state) => state.infoList
  );

  /**
   * 検索結果数をsetする
   */
  readonly setTotal = this.updater<number>((state, total) => {
    return { ...state, total };
  });

  /**
   * ページをsetする
   */
  readonly setPage = this.updater<number>((state, page) => {
    return { ...state, page: Number(page) };
  });

  /**
   * 表示数をsetする
   */
  readonly setDisplayNum = this.updater<number>((state, displayNum) => {
    if (displayNum > state.total) {
      return { ...state, displayNum: state.total };
    }
    return { ...state, displayNum };
  });

  /**
   * エラーをセットする
   */
  readonly setError = this.updater<{ code: number; message: string }>(
    (state, error) => {
      return { ...state, error };
    }
  );

  /**
   * お知らせをセットする
   */
  readonly setInfoList = this.updater<InfoList>((state, infoList) => {
    return { ...state, infoList };
  });

  /**
   * 検索する
   */
  readonly search = this.effect((args$: Observable<InfoListSearchRequest>) => {
    return args$.pipe(
      switchMap((credentials) =>
        this.infoListSearchService.execute(credentials).pipe(
          tapResponse(
            (result) => {
              return result;
            },
            (e) => {
              // TODO: エラー処理
              console.error(e);
            }
          )
        )
      ),
      map((search) => {
        // TODO: error処理
        if (Number(search.code) === 403) {
          this.setError({ code: search.code, message: search.message });
        }

        if (search.items) {
          this.setInfoList(search.items.infoList);
          this.setTotal(search.items.count);
          this.setPage(search.items.page);

          this.setDisplayNum(this.displayNum$);
        }
      })
    );
  });
}
