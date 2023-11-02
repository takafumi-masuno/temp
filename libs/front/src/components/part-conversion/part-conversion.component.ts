import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'athome-customhouse-part-conversion',
  templateUrl: './part-conversion.component.html',
  styleUrls: ['./part-conversion.component.scss'],
})
export class PartConversionComponent implements OnInit {
  @Input() topTable: {
    title: string;
    context: string;
  }[];
  @Input() bottomTable: {
    title: string;
    context: string;
  }[];
  @Input() statusData: string;

  // 公開状態のデザイン調整用
  selectValue = '';
  fontColor = '';
  changeColor(value) {
    this.selectValue = value;
    if (value) {
      // ステータスを変更したときにボタンの色を変える
      const btn = document.getElementsByClassName('statusChange');
      const buttons = Array.from(btn);
      const btnLength = btn.length;
      for (let i = 0; i < btnLength; i++) {
        buttons[i].classList.add('colorGreen');
      }
    }
  }

  // フォーム
  statusForm = this.formBuilder.group({
    status: ['', { updateOn: 'change' }],
  });

  constructor(private formBuilder: FormBuilder) {}

  get status(): FormControl {
    return this.statusForm.get('status') as FormControl;
  }

  ngOnInit(): void {
    this.status.setValue(this.statusData);
  }
}
