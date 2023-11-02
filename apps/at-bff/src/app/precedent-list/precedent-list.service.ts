import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrecedentListResponse } from '@front/precedent-list/model/precedent-list';
import { IPrecedentList } from '@bff/models/precedent-list';
import { convertToCodeNm } from '@bff/convert/convert-segment-value';

@Injectable()
export class PrecedentListService {
  /**
   * 建築事例一覧APIから取得した値をフロント表示用に編集
   * @param response 建築事例一覧取得APIから返却された値
   * @returns 編集した建築事例一覧情報を返却
   */
  getPrecedentList(response: IPrecedentList): { data: PrecedentListResponse } {
    const precedentDataList = response.items.precedentDataList.map(
      (response) => {
        return {
          kenchikuJireiId: response.kenchikuJireiId,
          shougou: response.shougou,
          image: response.image,
          price: response.price,
          kenchikuKouhou: convertToCodeNm(
            'KENCHIKU_KOUHOU_KUBUN',
            response.kenchikuKouhou
          ),
          shikichiMenseki: response.shikichiMenseki,
          nobeyukaMenseki: response.nobeyukaMenseki,
          shunkouNentuki: response.shunkouNentuki,
          madoriKubun: convertToCodeNm('MADORI_KUBUN', response.madoriKubun),
          koukaiJoutai: convertToCodeNm('KOUKAI_JOUTAI', response.koukaiJoutai),
        };
      }
    );
    const result: PrecedentListResponse = {
      message: response.message,
      items: {
        total: response.items.total,
        page: response.items.page,
        precedentDataList,
      },
    };
    return { data: result };
  }
}
