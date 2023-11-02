import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import { DeleteCatalogResponse } from '../models';

@Injectable({ providedIn: 'root' })
/**
 * カタログ削除service
 */
export class DeleteCatalogService {
  constructor(private api: ApiService) {}

  /**
   * カタログを削除する
   * @param catalogId カタログID
   * @returns bff返却値
   */
  execute(catalogId: number): Observable<DeleteCatalogResponse> {
    return this.api.postJSONContent<DeleteCatalogResponse>(
      new BffParams({ directory: ['catalog-detail', 'delete'] }),
      { catalogId }
    );
  }
}
