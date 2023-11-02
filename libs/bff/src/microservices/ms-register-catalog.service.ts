import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import {
  CatalogRequest,
  RegisterCatalogRequest,
  RegisterCatalogResponse,
} from '../models';
import { convertToCodeValue } from '../convert';
import { Observable, of } from 'rxjs';

@Injectable()
/**
 * カタログを登録するサービス
 */
export class MsRegisterCatalogService {
  constructor(private apiService: ApiService) {}

  /**
   * カタログの登録をapiにリクエストする
   * @param params 登録リクエスト
   * @returns レスポンス
   */
  public registerCatalog(
    params: CatalogRequest
  ): Observable<RegisterCatalogResponse<number>> {
    const request: RegisterCatalogRequest = {
      body: {
        shougou: params.shougou,
        catalogType: convertToCodeValue('CATALOG_TYPE', params.catalogType),
        catalogMedia: params.catalogMedia
          ? convertToCodeValue('CATALOG_MEDIA', params.catalogMedia)
          : null,
        catalogNm: params.catalogNm,
        catalogGaiyou: params.catalogGaiyou,
        catalogTag: params.catalogTag
          ? params.catalogTag.map((tag) =>
              convertToCodeValue('CATALOG_TAG', tag)
            )
          : null,
        catalogGazou: params.catalogGazou ? params.catalogGazou : null,
        koukaiJoutai: convertToCodeValue('KOUKAI_JOUTAI', params.koukaiJoutai),
      },
    };
    const result: RegisterCatalogResponse<number> = {
      code: 200,
      message: 'Success',
      catalog: { ...request.body },
    };

    return of(result);
    // TODO: api実行
    // return this.apiService.postJSONContent<RegisterCatalogResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['catalog-register'],
    //   }),
    //   request
    // );
  }
}
