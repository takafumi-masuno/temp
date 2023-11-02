import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import {
  Catalog as CatalogRegisterRequest,
  CatalogRegisterResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
/**
 * カタログ登録を行うservice
 */
export class CatalogRegisterService {
  constructor(private api: ApiService) {}

  /**
   * カタログの登録をbffにrequestする
   * @param params 登録リクエスト
   * @returns レスポンス
   */
  execute(params: CatalogRegisterRequest): Observable<CatalogRegisterResponse> {
    return this.api.postJSONContent<CatalogRegisterResponse>(
      new BffParams({ directory: ['catalog-register', 'register'] }),
      params
    );
  }
}
