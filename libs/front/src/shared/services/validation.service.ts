import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * バリデーション関連のサービス
 */
@Injectable({ providedIn: 'root' })
export class ValidationService {
  /**
   * 半角数字（小数点含む）のカスタムバリデーション
   * @param maxDigits 桁数上限
   * @returns バリデーション結果
   */
  checkDecimalNumber(maxDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      const regex = new RegExp(`^\\d{1,${maxDigits}}(\\.\\d+)?$`);
      return regex.test(inputValue) ? null : { isNotDecimalNumber: true };
    };
  }
}
