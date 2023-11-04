import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SegmentType } from '../../shared/constants';
import {
  DateService,
  PublicStatusService,
  ValidationService,
} from '../../shared/services';
import { IVisibilitySettings } from '../../shared/models';

/**
 * 公開設定パーツ
 */
@Component({
  selector: 'athome-customhouse-part-visibility-settings-form',
  templateUrl: './part-visibility-settings-form.component.html',
  styleUrls: ['./part-visibility-settings-form.component.scss'],
})
export class PartVisibilitySettingsFormComponent implements OnInit {
  constructor(
    private publicStatusService: PublicStatusService,
    private _builder: FormBuilder,
    private dateService: DateService,
    private validationService: ValidationService
  ) {}
  /** 公開設定情報 */
  @Input() data: IVisibilitySettings;

  /** フォーム情報 */
  @Output() formData = new EventEmitter<FormGroup>();

  /** 公開状態プルダウン選択肢 */
  koukaiJoutaiOptions: SegmentType[] = [];

  /** 公開後（公開を選択した後）かどうか */
  isAfterOpen = false;

  /**
   * 公開設定フォーム
   */
  public visibilitySettingsForm = this._builder.group({
    openStart: [this.dateService.getNowDate(), [Validators.required]],
    openEndSelection: [false, [this.validationService.startEndValidator]],
    openEnd: ['', [this.validationService.startEndValidator]],
    koukaiJoutai: [1, [Validators.required]],
  });

  ngOnInit() {
    if (this.data && Object.keys(this.data).length) {
      this.isAfterOpen =
        this.data.koukaiJoutai === 2 || this.data.koukaiJoutai === 3;

      this.visibilitySettingsForm.setValue({
        openStart: this.data.openStart,
        openEndSelection: Boolean(this.data.openEnd),
        openEnd: this.data.openEnd,
        koukaiJoutai: this.data.koukaiJoutai,
      });
    }

    // 公開状態プルダウン選択肢を設定
    this.koukaiJoutaiOptions =
      this.publicStatusService.createKoukaiJoutaiOptions(this.isAfterOpen);

    this.updateForm();
  }

  /**
   * 公開設定フォーム情報更新
   */
  updateForm() {
    this.formData.emit(this.visibilitySettingsForm);
  }

  /**
   * 公開終了日変更
   */
  changeStartEndSelection() {
    if (!this.visibilitySettingsForm.controls.openEndSelection.value) {
      this.visibilitySettingsForm.controls.openEnd.setValue('');
    }
    this.visibilitySettingsForm.controls.openEndSelection.markAsTouched();
    this.visibilitySettingsForm.controls.openEndSelection.updateValueAndValidity();
    this.visibilitySettingsForm.controls.openEnd.updateValueAndValidity();
  }
}
