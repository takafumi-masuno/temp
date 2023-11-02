import { Injectable } from '@angular/core';
import { SegmentType, SegmentValueMst } from '../constants';

/**
 * 公開状態関連のサービス
 */
@Injectable({ providedIn: 'root' })
export class PublicStatusService {
  /** 区分値マスタから取得した公開状態 */
  KOUKAI_JOUTAI = SegmentValueMst.SegmentValue.KOUKAI_JOUTAI;

  /**
   * 公開状態プルダウンの選択肢を作成する
   * @param isAfterOpen 公開後（公開を選択した後）かどうか
   * @returns 公開状態プルダウン選択肢
   */
  createKoukaiJoutaiOptions(isAfterOpen: boolean): SegmentType[] {
    // 公開後（公開を選択した後）
    if (isAfterOpen) {
      return [...this.KOUKAI_JOUTAI.slice(-2)];
    }
    // 公開前（公開を選択する前）
    if (!isAfterOpen) {
      return [...this.KOUKAI_JOUTAI.slice(0, 2)];
    }
  }
}
