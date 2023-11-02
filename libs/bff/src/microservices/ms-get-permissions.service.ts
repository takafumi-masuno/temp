import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiService } from '..';
import { GetPermissionsResponse } from '../models';

@Injectable()
/**
 * ユーザー権限を取得するサービス
 */
export class MsGetPermissionsService {
  constructor(private apiService: ApiService) {}
  /**
   * ユーザー権限を取得するサービス
   * @param request ユーザー権限取得リクエスト
   * @returns ユーザー権限情報
   */
  public getUserPermissions(
    sessionId: string
  ): Observable<GetPermissionsResponse> {
    return of({
      atUser: {
        roll: 1,
        permission: 2,
      },
    });
    /**
     * TODO: api実行処理
     */
    // return this.apiService.getJSONContent<GetPermissionsResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['permissions'],
    //   }),
    //   request
    // );
  }
}
