import { convertToCodeNm } from '@bff/convert';
import { RegisterCatalogResponse } from '@bff/models';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * カタログ登録service
 */
export class CatalogRegisterService {
  /**
   * catalo情報を編集する
   * @param response api返却値
   * @returns 区分値を編集した値
   */
  convertCatalog(
    response: RegisterCatalogResponse<number>
  ): RegisterCatalogResponse<string> {
    const result: RegisterCatalogResponse<string> = {
      code: response.code,
      message: response.message,
      catalog: {
        shougou: response.catalog.shougou,
        catalogType: convertToCodeNm(
          'CATALOG_TYPE',
          response.catalog.catalogType
        ),
        catalogMedia: response.catalog.catalogMedia
          ? convertToCodeNm('CATALOG_MEDIA', response.catalog.catalogMedia)
          : null,
        catalogNm: response.catalog.catalogNm,
        catalogGaiyou: response.catalog.catalogGaiyou,
        catalogTag: response.catalog.catalogTag
          ? response.catalog.catalogTag.map((tag) =>
              convertToCodeNm('CATALOG_TAG', tag)
            )
          : null,
        catalogGazou: response.catalog.catalogGazou
          ? response.catalog.catalogGazou
          : null,
        koukaiJoutai: convertToCodeNm(
          'KOUKAI_JOUTAI',
          response.catalog.koukaiJoutai
        ),
      },
    };

    return result;
  }
}
