import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';

@Injectable({ providedIn: 'root' })
/**
 * お知らせ情報firstView取得service
 */
export class GetInfoPreviewFirstViewService {
  constructor(private api: ApiService) {}

  /**
   * お知らせ情報のfirstViewを取得する
   * @param oshiraseId お知らせID
   * @returns bffから返却された値
   */
  execute(oshiraseId: number) {
    return this.api.getJSONContent(
      new BffParams({ directory: ['info-preview', 'first-view'] }),
      { oshiraseId }
    );
  }
}
