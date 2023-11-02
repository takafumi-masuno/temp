import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import {
  CatalogDetailRequest,
  CatalogDetailResponse,
} from '../models/catalog-detail.model';

@Injectable({ providedIn: 'root' })
/**
 * カタログ詳細firstView取得サービス
 */
export class GetCatalogDetailFirstViewService {
  constructor(private api: ApiService) {}

  /**
   * カタログ詳細のfirstViewを取得する
   * @param params bffに渡すリクエスト
   * @returns bffからの返却値
   */
  execute(params: CatalogDetailRequest): Observable<CatalogDetailResponse> {
    return this.api.getJSONContent<CatalogDetailResponse>(
      new BffParams({ directory: ['catalog-detail', 'first-view'] }),
      params
    );
  }
}
