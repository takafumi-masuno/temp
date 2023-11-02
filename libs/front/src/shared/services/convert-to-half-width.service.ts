import { Injectable } from '@angular/core';

/**
 * 全角数値（ドット、ハイフン含む）を半角数値（ドット、ハイフン含む）に変換するサービス
 */
@Injectable({ providedIn: 'root' })
export class ConvertToHalfWidthService {
  /**
   * 全角数値（ドット、ハイフン含む）を半角数値（ドット、ハイフン含む）に変換する
   * @param str 変換したい文字
   * @returns 半角文字に変換した文字
   */
  convertToHalfWidth(str: string): string {
    const fullWidthNumberPattern = /[０-９．－]/g;
    return str.replace(fullWidthNumberPattern, (match) => {
      const charCode = match.charCodeAt(0);
      if (charCode >= 0xff10 && charCode <= 0xff19) {
        return String.fromCharCode(charCode - 0xfee0);
      } else if (charCode === 0xff0e) {
        return '.';
      } else if (charCode === 0xff0d) {
        return '-';
      }
      return match;
    });
  }
}
