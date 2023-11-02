import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@shared/services';
import { BffParams } from '@shared/apis';
import {
  ICompanySearchConditions,
  ICompanySearchResult,
} from '../models/company-list.model';
import { GetCompaniesRequest } from '../models/company-list.model';

@Injectable({ providedIn: 'root' })
export class CompanyListService {
  constructor(private api: ApiService) {}

  /**
   * 検索条件に合致する建築会社一覧情報を取得する
   * @param search 検索条件
   * @returns 建築会社一覧情報
   */
  searchCompanies(
    searchConditions: ICompanySearchConditions
  ): Observable<ICompanySearchResult> {
    const getCompaniesParams: GetCompaniesRequest = {
      kaiinNo: searchConditions.searchKaiinNo,
      shougou: searchConditions.searchShougou,
      shougouKana: searchConditions.searchShougouKana,
      tel: searchConditions.searchTel,
      koukaiJoutai: searchConditions.selectValue,
      sort: searchConditions.config.sort,
      order: searchConditions.config.order,
      page: searchConditions.config.page,
      limitPerPage: searchConditions.config.limitPerPage,
    };
    const bffParams = new BffParams({
      directory: ['company-list', 'companies'],
    });
    return this.api.getJSONContent<ICompanySearchResult>(
      bffParams,
      getCompaniesParams
    );
  }
}
