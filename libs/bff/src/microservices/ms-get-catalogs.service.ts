import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';
import { GetCatalogsRequest, GetCatalogsResponse } from '../models';
import { convertToCodeValue } from '../convert';

@Injectable()
/**
 * カタログ一覧を取得するサービス
 */
export class MsGetCatalogListService {
  constructor(private apiService: ApiService) {}
  /**
   * カタログ一覧を取得する
   * @param request フロントからのリクエスト
   * @returns カタログ一覧
   */
  public getCatalogList(
    request: GetCatalogsRequest<string>
  ): Observable<GetCatalogsResponse<number>> {
    if (!Array.isArray(request.catalogTag)) {
      request.catalogTag = request.catalogTag ? [request.catalogTag] : null;
    }

    const query: GetCatalogsRequest<number> = {
      ...request,
      catalogNm: request.catalogNm ? request.catalogNm : null,
      catalogType: request.catalogType
        ? convertToCodeValue('CATALOG_TYPE', request.catalogType)
        : null,
      catalogMedia: request.catalogMedia
        ? convertToCodeValue('CATALOG_MEDIA', request.catalogMedia)
        : null,
      koukaiJoutai: request.koukaiJoutai
        ? convertToCodeValue('KOUKAI_JOUTAI', request.koukaiJoutai)
        : null,
      catalogTag: request.catalogTag
        ? request.catalogTag.map((tag) =>
            convertToCodeValue('CATALOG_TAG', tag)
          )
        : null,
    };

    const result: GetCatalogsResponse<number> = {
      count: 10,
      page: request.page,
      total: 100,
      catalogDataList: [
        {
          catalogId: 1,
          shougou: 'AAA株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 1,
          catalogTag: [1, 3, 4, 7, 8, 10, 43],
          koukaiJoutai: 2,
        },
        {
          catalogId: 2,
          shougou: 'BBB株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 2,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 3,
        },
        {
          catalogId: 3,
          shougou: 'CCC株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 1,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 1,
        },
        {
          catalogId: 4,
          shougou: 'DDD株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 3,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 5,
          shougou: 'EEE株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 1,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 6,
          shougou: 'FFF株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 3,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 7,
          shougou: 'GGG株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 1,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 8,
          shougou: 'HHH株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 3,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 9,
          shougou: 'III株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 1,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
        {
          catalogId: 10,
          shougou: 'JJJ株式会社',
          catalogNm: '剛木造「超空間の家スマート」',
          catalogGaiyou:
            'オンリーワンの木造注文住宅。"こんな家に住みたい"住人十色の家族のカタチに応える。自由度の高い空間設計でお好みの住まいづくりを。',
          catalogType: 2,
          catalogMedia: 3,
          catalogTag: [1, 3, 4],
          koukaiJoutai: 2,
        },
      ],
    };

    const errorResult: GetCatalogsResponse<number> = {
      detail: 'The server is currently unavailable.',
    };

    return of(result);

    // TODO: api実行処理
    // return this.apiService.getJSONContent<GetCatalogsResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['catalogs'],
    //   }),
    //   query
    // );
  }
}
