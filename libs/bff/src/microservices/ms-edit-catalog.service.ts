import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import {
  EditCatalogRequest,
  EditCatalogResponse,
  EditCatalogApiRequest,
} from '../models';
import { Observable, of } from 'rxjs';
import { convertToCodeValue } from '..//convert';
import { MicroServiceType, MicroserviceParams } from '@shared/apis';

@Injectable()
/**
 * カタログを変更するサービス
 */
export class MsEditCatalogService {
  constructor(private apiService: ApiService) {}

  /**
   * カタログを更新する
   * @param request フロントからのリクエスト
   * @returns apiからの返却値
   */
  public updateCatalog(
    request: EditCatalogRequest
  ): Observable<EditCatalogResponse<number>> {
    const catalogTag = request.catalogTag
      ? request.catalogTag.split(',')
      : null;
    const requestBody: EditCatalogApiRequest = {
      catalogId: request.catalogId,
      shougou: request.shougou,
      catalogType: convertToCodeValue('CATALOG_TYPE', request.catalogType),
      catalogMedia: request.catalogMedia
        ? convertToCodeValue('CATALOG_MEDIA', request.catalogMedia)
        : null,
      catalogNm: request.catalogNm,
      catalogGaiyou: request.catalogGaiyou,
      catalogTag: catalogTag
        ? catalogTag.map((tag) => convertToCodeValue('CATALOG_TAG', tag))
        : null,
      catalogGazou: request.catalogGazou ? request.catalogGazou : null,
      koukaiJoutai: convertToCodeValue('KOUKAI_JOUTAI', request.koukaiJoutai),
    };

    const result: EditCatalogResponse<number> = {
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
    // return this.apiService.postJSONContent<EditCatalogResponse<number>>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['catalog-edit'],
    //   }),
    //   requestBody
    // );
  }
}
