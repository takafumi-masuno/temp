import { Injectable } from '@angular/core';

/**
 * 日付関連のサービス
 */
@Injectable({ providedIn: 'root' })
export class DateService {
  /**
   * 現在日付（yyyy-MM-dd形式）を取得する
   * @returns 現在日付（yyyy-MM-dd形式）
   */
  getNowDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${date}`;
    return today;
  }
}
