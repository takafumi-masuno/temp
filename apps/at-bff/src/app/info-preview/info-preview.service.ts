import { convertToCodeNm } from '@bff/convert';
import { GetInfoPreviewResponse } from '@bff/models';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * お知らせ情報service
 */
export class InfoPreviewService {
  /**
   * お知らせ情報service
   * @param infoPreview frontに返す値
   * @returns apiから取得した値
   */
  convertToInfoPreview(
    infoPreview: GetInfoPreviewResponse<number>
  ): GetInfoPreviewResponse<string> {
    const result: GetInfoPreviewResponse<string> = {
      code: infoPreview.code,
      message: infoPreview.message,
    };

    if (!infoPreview.info) return result;

    const updatedDate = new Date(infoPreview.info.updatedDate);
    const info: GetInfoPreviewResponse<string>['info'] = {
      ...infoPreview.info,
      shousai:
        'お知らせテキストが入ります。<a href="#">ここの文章全体にリンクを設定する。</a>',
      koukaiJoutai: convertToCodeNm(
        'KOUKAI_JOUTAI',
        infoPreview.info.koukaiJoutai
      ),
      updatedDate:
        updatedDate.getFullYear() +
        '/' +
        ('0' + (updatedDate.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + updatedDate.getDate()).slice(-2),
    };

    result['info'] = info;

    return result;
  }
}
