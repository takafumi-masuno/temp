import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiService } from '..';
import { GetLoginRequest, GetLoginResponse } from '../models';

@Injectable()
/**
 * ログイン情報を取得するサービス
 */
export class MsGetLoginsService {
  constructor(private apiService: ApiService) {}
  /**
   * ログイン情報を取得する
   * @param request ログイン情報取得リクエスト
   * @returns ログイン情報
   */
  public getLoginInfo(request: GetLoginRequest): Observable<GetLoginResponse> {
    // TODO：削除予定。userIdが's'だったら、ログイン成功。それ以外はログイン失敗
    let loginInfo: GetLoginResponse;

    if (request.userId === 's1') {
      // TODO: 仮のログイン初回成功状態
      loginInfo = {
        sessionId: 'afa7f9879wefa',
        detail: '',
        isFirstTimeLogin: true,
      };
    } else if (request.userId === 's2') {
      // TODO: 仮のログイン2回目以降成功状態
      loginInfo = {
        sessionId: 'afa7f9879wefa',
        detail: '',
        isFirstTimeLogin: false,
      };
    } else {
      // TODO: 仮のログイン失敗状態
      loginInfo = {
        sessionId: null,
        detail: 'エラーメッセージです。',
      };
    }

    return of(loginInfo);
    /**
     * TODO: api実行処理(APIからログイン情報を取得する)
     */
    // return this.apiService.getJSONContent<GetLoginResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['login'],
    //   }),
    //   request
    // );
  }
}
