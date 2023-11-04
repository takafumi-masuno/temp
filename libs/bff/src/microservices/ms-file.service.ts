import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { IUploadFileBodyResponse } from '../models';
import { Observable, of } from 'rxjs';
import { BasicResponseType } from '@shared/models';
import * as FormData from 'form-data';

@Injectable()
export class MsFileService {
  constructor(private apiService: ApiService) {}

  uploadFile(
    uploadedFileBuffer: Buffer,
    uploadedFileName: string
  ): Observable<BasicResponseType<IUploadFileBodyResponse>> {
    // TODO: 本実装は建築会社一覧情報取得APIをコールする
    const formData = new FormData();
    formData.append('file', uploadedFileBuffer, uploadedFileName);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const fileUrl = `http://www.test.co.jp/image-file/${hours}${minutes}${seconds}`;
    return of({
      message: 'Success',
      body: {
        url: fileUrl,
      },
    });
    // return of({
    //   detail: 'Error'
    // })
  }

  // TODO: ↓本実装想定処理
  // return this.apiService.getJSONContent<GetCitiesRes>(
  //   new MicroserviceParams({
  //     type: MicroServiceType.base,
  //     path: ['city']
  //   }),
  //   params
  // )
}
