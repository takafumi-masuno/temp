import { NgModule } from '@angular/core';
import { PartCompletionComponent } from './part-completion.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PartCompletionComponent],
  imports: [CommonModule],
  exports: [PartCompletionComponent],
  bootstrap: [PartCompletionComponent],
})
export class PartCompletionModule {}
