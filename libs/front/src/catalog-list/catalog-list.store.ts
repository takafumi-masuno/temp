import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { CatalogSearchService } from './services';
import { StoreSearchFacade } from '../shared/stores/store-search';
import { CatalogListSearchRequest, CatalogListSearchResponse } from './models';

interface CatalogListState {
  total: number;
  page: number;
  displayNum: number;
  catalogList: CatalogListSearchResponse['catalogDataList'];
  error: string;
}

@Injectable()
export class CatalogListStore extends ComponentStore<CatalogListState> {
  constructor(
    public catalogSearchService: CatalogSearchService,
    private storeSearchFacade: StoreSearchFacade
  ) {
    super({
      total: 0,
      page: 0,
      catalogList: null,
      displayNum: 10,
      error: null,
    });

    this.search$
      .pipe(
        filter((x) => !!x),
        first()
      )
      .subscribe((x) => {
        this.setCatalogListSearch(x);
      });
  }

  readonly total$: Observable<number> = this.select((state) => state.total);
  readonly search$ = this.storeSearchFacade.search$;
  readonly catalogList$: Observable<
    CatalogListSearchResponse['catalogDataList']
  > = this.select((state) => state.catalogList);
  readonly page$: Observable<number> = this.select((state) => state.page);
  readonly displayNum$: Observable<number> = this.select(
    (state) => state.displayNum
  );
  readonly error$: Observable<string> = this.select((state) => state.error);

  /**
   * 検索結果をsetする
   */
  readonly setCatalogListSearch = this.updater<
    CatalogListSearchResponse['catalogDataList']
  >((state, catalogList) => {
    return { ...state, catalogList };
  });

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
  readonly setError = this.updater<string>((state, error) => {
    return { ...state, error };
  });

  /**
   * 検索する
   */
  readonly search = this.effect(
    (args$: Observable<CatalogListSearchRequest>) => {
      return args$.pipe(
        switchMap((credentials) =>
          this.catalogSearchService.execute(credentials).pipe(
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
          if (search.detail) {
            this.setError(search.detail);
          }

          if (search) {
            this.setCatalogListSearch(search.catalogDataList);
            this.setTotal(search.count);
            this.setPage(search.page);

            this.setDisplayNum(this.displayNum$);
          }
        })
      );
    }
  );
}
