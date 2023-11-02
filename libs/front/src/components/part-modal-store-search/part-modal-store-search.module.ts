import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartModalStoreSearchComponent } from './part-modal-store-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PartModalStoreSearchComponent],
  imports: [CommonModule, FormsModule],
  exports: [PartModalStoreSearchComponent],
  bootstrap: [PartModalStoreSearchComponent],
})
export class PartModalStoreSearchModule {}
