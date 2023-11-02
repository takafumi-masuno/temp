import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';
import { CatalogDetailRequest, CatalogDetailResponse } from '../models';

@Injectable()
/**
 * カタログを取得するMsService
 */
export class MsGetCatalogDetailService {
  constructor(private apiService: ApiService) {}

  /**
   * カタログを取得する
   * @param request フロントからのリクエスト
   * @returns api返却値
   */
  public getCatalogDetail(
    request: CatalogDetailRequest
  ): Observable<CatalogDetailResponse<number>> {
    const result: CatalogDetailResponse<number> = {
      code: 200,
      message: 'Success',
      catalog: {
        shougou: 'アキュラホーム',
        catalogType: 1,
        catalogMedia: 1,
        catalogNm: '剛木造「超空間の家スマート」',
        catalogGaiyou:
          'オンリーワンの木造注文住宅。"こんな家に住みたい"十人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
        catalogTag: [1, 4, 6],
        catalogGazou: {
          file: undefined,
          path: '',
          name: '',
          src: '',
        },
        koukaiJoutai: 1,
      },
    };

    return of(result);

    // TODO: api実行処理
    // return this.apiService.getJSONContent<CatalogDetailResponse<number>>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: [request.catalogId],
    //   }),
    //   query
    // );
  }
}
