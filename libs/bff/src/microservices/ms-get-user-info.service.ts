import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiService } from '..';
import { GetUserInfoResponse } from '../models';

@Injectable()
/**
 * ユーザー情報を取得するサービス
 */
export class MsGetUserInfoService {
  constructor(private apiService: ApiService) {}
  /**
   * ユーザー情報を取得する
   * @param request ユーザ情報取得リクエスト
   * @returns ユーザー情報
   */
  public getUserInfo(sessionId: string): Observable<GetUserInfoResponse> {
    const userInfo: GetUserInfoResponse = {
      userId: 'cj1300010001',
      nm: '山田太郎',
      kenchikuKaishaId: 1,
      tenpoModelHouseId: 1,
      shougou: 'アキュラホーム',
      shougouKana: 'アキュラホーム',
      tenpoModelHouseNm: '東京支店',
    };

    return of(userInfo);
    /**
     * TODO: api実行処理
     */
    // return this.apiService.getJSONContent<GetUserInfoResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['user-info'],
    //   }),
    //   request
    // );
  }
}
