import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import {
  Shougou as CatalogShougouRequest,
  CatalogShougouResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
/**
 * 商号を検索するサービス
 */
export class CatalogShougouSearchService {
  constructor(private api: ApiService) {}

  /**
   * 商号検索をbffにリクエストする
   * @param params 商号検索リクエスト
   * @returns レスポンス
   */
  execute(params: CatalogShougouRequest): Observable<CatalogShougouResponse> {
    return this.api.getJSONContent<CatalogShougouResponse>(
      new BffParams({ directory: ['shougou', 'search'] }),
      { ...params, selectors: 'shougou' }
    );
  }
}
