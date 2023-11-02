import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartModalTagPickerComponent } from './part-modal-tag-picker.component';

@NgModule({
  declarations: [PartModalTagPickerComponent],
  imports: [CommonModule],
  exports: [PartModalTagPickerComponent],
  bootstrap: [PartModalTagPickerComponent],
})
export class PartModalTagPickerModule {}
