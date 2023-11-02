import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';
import { MicroServiceType, MicroserviceParams } from '@shared/apis';
import { GetInfoListRequest, GetInfoListResponse } from '../models';
import { convertToCodeValue } from '../convert';

@Injectable()
/**
 * お知らせ一覧を取得するサービス
 */
export class MsGetInfoListService {
  constructor(private apiService: ApiService) {}
  /**
   * お知らせを取得する
   * @param request フロントからのリクエスト
   * @returns apiから返却された値
   */
  public getInfoList(
    request: GetInfoListRequest<string>
  ): Observable<GetInfoListResponse<number>> {
    const query: GetInfoListRequest<number> = {
      page: request.page,
      count: request.count,
      isPublish: request.isPublish,
      koukaiJoutai: request.koukaiJoutai
        ? convertToCodeValue('KOUKAI_JOUTAI', request.koukaiJoutai)
        : null,
      title: request.title,
      sort: request.sort,
    };

    const result: GetInfoListResponse<number> = {
      code: 200,
      message: 'Success',
      items: {
        count: 20,
        page: request.page,
        infoList: [
          {
            oshiraseId: 1,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 2,
            title: 'メンテナンス',
            keisaiKikan: '2023/04/01 0:00～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 3,
          },
          {
            oshiraseId: 3,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 4,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 5,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 6,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 7,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 8,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 9,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
          {
            oshiraseId: 10,
            title: 'GW中の施工会社登録について',
            keisaiKikan: '～2023/05/09 23:59',
            createDate: '2023/04/01 17:00',
            koukaiJoutai: 1,
          },
        ],
      },
    };

    return of(result);

    // return this.apiService.getJSONContent<string>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['info'],
    //   }),
    //   query
    // );
  }
}
