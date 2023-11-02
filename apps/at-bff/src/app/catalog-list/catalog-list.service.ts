import { Injectable } from '@nestjs/common';
import { GetCatalogsResponse } from '@bff/models';
import { convertToCodeNm } from '@bff/convert';

@Injectable()
/**
 * カタログ一覧を表示する値に編集するサービス
 */
export class CatalogListService {
  /**
   *
   * @param catalogs apiから返却されたカタログ一覧
   * @returns 編集済みカタログ一覧
   */
  getCatalogList(
    catalogs: GetCatalogsResponse<number>
  ): GetCatalogsResponse<string> {
    if (catalogs.detail) {
      return {
        detail: catalogs.detail,
      };
    }

    const catalogDataList = catalogs.catalogDataList.map((catalogData) => {
      return {
        ...catalogData,
        catalogType: convertToCodeNm('CATALOG_TYPE', catalogData.catalogType),
        catalogMedia: convertToCodeNm(
          'CATALOG_MEDIA',
          catalogData.catalogMedia
        ),
        catalogTag: catalogData.catalogTag.map((tag) =>
          convertToCodeNm('CATALOG_TAG', tag)
        ),
        koukaiJoutai: convertToCodeNm(
          'KOUKAI_JOUTAI',
          catalogData.koukaiJoutai
        ),
      };
    });

    const result: GetCatalogsResponse<string> = {
      ...catalogs,
      catalogDataList,
    };

    return result;
  }
}
