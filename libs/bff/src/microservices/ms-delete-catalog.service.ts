import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';
import { DeleteCatalogResponse } from '../models';

@Injectable()
/**
 * カタログを削除するMsService
 */
export class MsDeleteCatalogService {
  constructor(private apiService: ApiService) {}

  /**
   * カタログを削除する
   * @param catalogId カタログID
   * @returns api返却値
   */
  public deleteCatalog(catalogId: number): Observable<DeleteCatalogResponse> {
    // TODO: api実行処理
    // return this.apiService.postJSONContent<{ code: 200; message: 'Success' }>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: [catalogId.toString()],
    //   }),
    //   {}
    // );

    return of({ code: 200, message: 'Success' });
  }
}
