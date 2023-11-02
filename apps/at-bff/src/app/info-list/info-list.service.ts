import { convertToCodeNm } from '@bff/convert';
import { GetInfoListResponse } from '@bff/models';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * お知らせ一覧を編集する
 */
export class InfoListService {
  /**
   * お知らせ一覧編集
   * @param infoList apiから返却された値
   * @returns frontに返す値
   */
  convertToInfoList(
    infoList: GetInfoListResponse<number>
  ): GetInfoListResponse<string> {
    const result: GetInfoListResponse<string> = {
      code: infoList.code,
      message: infoList.message,
    };

    if (!infoList.items) return result;

    const convertedInfoList = infoList.items.infoList.map((info) => {
      return {
        ...info,
        koukaiJoutai: convertToCodeNm('KOUKAI_JOUTAI', info.koukaiJoutai),
      };
    });

    const items: GetInfoListResponse<string>['items'] = {
      count: infoList.items.count,
      page: infoList.items.page,
      infoList: convertedInfoList,
    };

    result['items'] = items;

    return result;
  }
}
