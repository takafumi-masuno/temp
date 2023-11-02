import { convertToCodeNm } from '@bff/convert';
import { CatalogDetailResponse } from '@bff/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogDetailService {
  convertCatalogDetail(
    response: CatalogDetailResponse<number>
  ): CatalogDetailResponse<string> {
    const result: CatalogDetailResponse<string> = {
      code: response.code,
      message: response.message,
    };

    if (!response.catalog) return result;

    const {
      shougou,
      catalogType,
      catalogMedia,
      catalogGaiyou,
      catalogNm,
      catalogGazou,
      catalogTag,
      koukaiJoutai,
    } = response.catalog;

    const catalog: CatalogDetailResponse<string>['catalog'] = {
      shougou,
      catalogType: convertToCodeNm('CATALOG_TYPE', catalogType),
      catalogMedia: catalogMedia
        ? convertToCodeNm('CATALOG_MEDIA', catalogMedia)
        : null,
      catalogNm,
      catalogGaiyou,
      catalogTag: catalogTag
        ? catalogTag.map((tag) => convertToCodeNm('CATALOG_TAG', tag))
        : null,
      catalogGazou: catalogGazou ? catalogGazou : null,
      koukaiJoutai: convertToCodeNm('KOUKAI_JOUTAI', koukaiJoutai),
    };

    result['catalog'] = catalog;

    return result;
  }
}
