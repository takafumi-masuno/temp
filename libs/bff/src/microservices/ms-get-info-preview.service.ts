import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';
import { GetInfoPreviewRequest, GetInfoPreviewResponse } from '../models';
import { MicroServiceType, MicroserviceParams } from '@shared/apis';

@Injectable()
export class MsGetInfoPreviewService {
  constructor(private apiService: ApiService) {}

  public getInfoPreview(
    params: GetInfoPreviewRequest
  ): Observable<GetInfoPreviewResponse<number>> {
    const result: GetInfoPreviewResponse<number> = {
      code: 200,
      message: 'Success',
      info: {
        title: 'GW中の施工会社登録について',
        shousai: 'お知らせテキストが入ります',
        gazou: {
          file: undefined,
          src: '',
          name: '',
          path: '',
        },
        pdf: {
          file: undefined,
          path: '',
          name: '操作マニュアル（PDF）',
        },
        juuyouHyouji: 1,
        keisaiStartDate: '2023/04/01',
        keisaiEndDate: '指定なし',
        koukaiJoutai: 1,
        previousId: null,
        nextId: 500,
        updatedDate: '2999/12/31 00:00:00.000',
      },
    };

    return of(result);

    // return this.apiService.getJSONContent<GetInfoPreviewResponse<number>>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: [`info/${params.oshiraseId}`],
    //   }),
    //   {}
    // );
  }
}
