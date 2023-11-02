import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartModalEnsenSearchComponent } from './part-modal-ensen-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PartModalEnsenSearchComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PartModalEnsenSearchComponent],
  bootstrap: [PartModalEnsenSearchComponent],
})
export class PartModalEnsenSearchModule {}
