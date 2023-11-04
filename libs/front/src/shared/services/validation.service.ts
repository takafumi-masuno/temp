import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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

  /**
   * 公開終了日のカスタムバリデーション
   */
  startEndValidator(form: FormControl) {
    if (!form.parent || !form.parent.controls) {
      return null;
    }
    return form.parent.get('openEndSelection').value &&
      !form.parent.get('openEnd').value
      ? { required: true }
      : null;
  }
}
