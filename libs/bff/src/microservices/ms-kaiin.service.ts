import { ApiService } from '..';
import { Injectable } from '@nestjs/common';
import { GetKaiinRequest, IKaiin } from '../models';
import { Observable, of } from 'rxjs';
import { IBasicErrorResponse } from '@shared/models';

/**
 * 会員関連のマイクロサービス
 */
@Injectable()
export class MsKaiinService {
  constructor(private apiService: ApiService) {}

  /**
   * 会員基本取得APIをコールする
   * @param params APIコール用のパラメータ群
   * @return APIレスポンス
   */
  getKaiin(
    requestParams: GetKaiinRequest
  ): Observable<IKaiin | IBasicErrorResponse> {
    // TODO: 本実装は会員基本取得APIをコールする
    if (requestParams.path.kaiinNo === '99999') {
      return of({ detail: 'Invalid syntax for this request was provided.' });
    } else {
      const mockData = {
        kaiinNo: requestParams.path.kaiinNo,
        shogoName: '山梨林業株式会社',
        shogoKana: 'ヤマナシリンギョウカブシキガイシャイチ',
        postNo: '1008270',
        todofukenName: '東京都',
        cityName: '千代田区',
        townName: '大手町１丁目',
        banchi: '３-１',
        buildingName: '大和ビル101',
        stationName: '大手町駅',
        railLineName: '東京メトロ千代田線',
        tohoJikan: 10,
        basJikan: 10,
        basteiName: '中野市役所前',
        basteiJikan: 10,
        ippanTel: '03-3214-9991',
        daihyoFax: '03-3214-9990',
        daihyoshaName: '山田太郎',
        menkyoName: '東京都知事免許（３）第９０１２９号',
        shozokuDantaiName: '(公社)神奈川県宅地建物取引業協会',
        hoshoKyokaiName: '(公社)全国宅地建物取引業保証協会',
        kotoriName: '(公社)首都圏不動産公正取引協議会',
        shihonkin: '7億9800万円',
        staffCnt: '240',
        setsuritsuDate: '19790801',
        teikyuDay: '水曜日',
        otherTeikyuDay: '年末年始・夏季休暇',
        eigyoStartTime: '0930',
        eigyoEndTime: '1700',
        otherEigyoTime: '土日祝 9:00～16:00',
      };
      return of(mockData);
    }
    // TODO: ↓本実装想定処理
    // return this.apiService.getJSONContent<IKaiin>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.detail,
    //     serviceName: 'kaiin',
    //     path: ['kaiin', params.path.kaiinNo],
    //   }), {}
    // );
  }
}
