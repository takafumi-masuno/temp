import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartModalShougouSearchComponent } from './part-modal-shougou-search.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../shared/share.module';

@NgModule({
  declarations: [PartModalShougouSearchComponent],
  imports: [CommonModule, FormsModule, ShareModule],
  exports: [PartModalShougouSearchComponent],
  bootstrap: [PartModalShougouSearchComponent],
})
export class PartModalShougouSearchModule {}
