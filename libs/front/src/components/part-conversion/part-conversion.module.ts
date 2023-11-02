import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartConversionComponent } from './part-conversion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PartModalChangeConfirmModule } from '../part-modal-change-confirm';

@NgModule({
  declarations: [PartConversionComponent],
  imports: [CommonModule, ReactiveFormsModule, PartModalChangeConfirmModule],
  exports: [PartConversionComponent],
  bootstrap: [PartConversionComponent],
})
export class PartConversionModule {}
