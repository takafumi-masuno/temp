import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Users, UsersGetRequest, UsersGetResponse } from '../models';
import { convertToCodeValue } from '../convert';
import { Observable, of } from 'rxjs';

@Injectable()
/**
 * ユーザー一覧情報を取得するサービス
 */
export class MsGetUsersService {
  constructor(private apiService: ApiService) {}

  /**
   * ユーザー一覧の取得をapiにリクエストする
   * @param params ユーザー取得リクエスト
   * @returns レスポンス
   */
  public getUsers(params: Users): Observable<UsersGetResponse<number>> {
    const query: UsersGetRequest = {
      query: {
        page: params.page ? params.page : null,
        count: params.count ? params.count : null,
        sort: params.sort ? params.sort : null,
        selectors: params.selectors ? params.selectors : null,
        shougou: params.shougou ? params.shougou : null,
        shougouKana: params.shougouKana ? params.shougouKana : null,
        nm: params.nm ? params.nm : null,
        tenpoNm: params.tenpoNm ? params.tenpoNm : null,
        status: params.userJoutai
          ? convertToCodeValue('USER_JOUTAI', params.userJoutai)
          : null,
      },
    };
    const shougouSearchResult: UsersGetResponse<number> = {
      code: 200,
      message: 'Success',
      items: {
        count: 5,
        page: 1,
        users: [
          {
            shougou: 'アットホーム',
          },
          {
            shougou: 'アットホーム株式会社1',
          },
          {
            shougou: 'アットホーム株式会社2',
          },
          {
            shougou: 'アットホーム株式会社3',
          },
          {
            shougou: 'アットホーム株式会社4',
          },
        ],
      },
    };

    return of(shougouSearchResult);
    // TODO: api実行
    // return this.apiService.getJSONContent<UsersSearchResponse<number>>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['users'],
    //   }),
    //   query
    // );
  }
}
