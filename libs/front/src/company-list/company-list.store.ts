import { Observable, filter, mergeMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  IConfig,
  IErrorNotice,
  ICompany,
  ICompanySearchConditions,
  ICompanySearchResult,
  ISearchConditions,
} from './models/company-list.model';
import { CompanyListService } from './services/company-list.service';
import { StoreSearchFacade } from '../shared/stores/store-search';

export interface CompanyListState {
  deletedNotice: boolean;
  noResult: boolean;
  errorNotice?: IErrorNotice;
  total: number;
  companySearch: ICompanySearchConditions;
  companies: ICompany[];
}

@Injectable()
export class CompanyListStore extends ComponentStore<CompanyListState> {
  constructor(
    private companyListService: CompanyListService,
    private storeSearchFacade: StoreSearchFacade
  ) {
    super({
      deletedNotice: false,
      noResult: false,
      total: 0,
      companySearch: null,
      companies: [],
    });

    this.companySearch$.pipe(filter((x) => !!x)).subscribe((x) => {
      this.searchCompanies(x);
    });
  }

  /**
   * select
   */
  readonly deletedNotice$: Observable<boolean> = this.select(
    ({ deletedNotice }) => deletedNotice
  );

  readonly noResult$: Observable<boolean> = this.select(
    ({ noResult }) => noResult
  );

  readonly errorNotice$: Observable<IErrorNotice> = this.select(
    ({ errorNotice }) => errorNotice
  );

  readonly total$: Observable<number> = this.select(({ total }) => total);

  readonly companySearch$: Observable<ICompanySearchConditions> = this.select(
    ({ companySearch }) => companySearch
  );

  readonly companies$: Observable<ICompany[]> = this.select(
    ({ companies }) => companies
  );

  /**
   * updater
   */
  readonly setDeletedNotice = this.updater<boolean>((state, deletedNotice) => ({
    ...state,
    deletedNotice,
  }));

  readonly setNoResult = this.updater<boolean>((state, noResult) => ({
    ...state,
    noResult,
  }));

  readonly setErrorNotice = this.updater<IErrorNotice>(
    (state, errorNotice) => ({
      ...state,
      errorNotice,
    })
  );

  readonly setCompanyList = this.updater<ICompanySearchResult>(
    (state, searchResult) => ({
      ...state,
      total: searchResult.total,
      page: searchResult.page,
      companies: searchResult.companies,
    })
  );

  readonly setCompanySearch = this.updater<ISearchConditions>(
    (
      state,
      {
        searchKaiinNo,
        searchShougou,
        searchShougouKana,
        searchTel,
        selectValue,
      }
    ) => ({
      ...state,
      noResult: false,
      companySearch: {
        searchKaiinNo,
        searchShougou,
        searchShougouKana,
        searchTel,
        selectValue,
        config: {
          sort: '',
          order: '',
          page: 1,
          limitPerPage: 10,
        },
      },
    })
  );

  readonly setSort = this.updater<IConfig>((state, config) => ({
    ...state,
    companySearch: {
      ...state.companySearch,
      config: {
        ...state.companySearch.config,
        ...config,
        sort: config.order ? config.sort : '',
      },
    },
  }));

  readonly setPage = this.updater<number>((state, page) => ({
    ...state,
    companySearch: {
      ...state.companySearch,
      config: {
        ...state.companySearch.config,
        page,
      },
    },
  }));

  readonly searchCompanies = this.effect(
    (searchConditions$: Observable<ICompanySearchConditions>) =>
      searchConditions$.pipe(
        mergeMap((search) =>
          this.companyListService.searchCompanies(search).pipe(
            tapResponse(
              (result) => {
                this.setCompanyList({
                  total: 0,
                  page: 1,
                  companies: [],
                });
                this.setNoResult(false);
                if (!result.companies.length) {
                  this.setNoResult(true);
                } else {
                  this.setCompanyList(result);
                }
              },
              (e) => {
                // TODO: エラー処理
                console.error('エラー発生', e);
              }
            )
          )
        )
      )
  );
}
