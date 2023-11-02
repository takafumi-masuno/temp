import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartHeaderComponent } from './part-header.component';
import { PushPipe } from '@ngrx/component';

@NgModule({
  declarations: [PartHeaderComponent],
  imports: [CommonModule, PushPipe],
  exports: [PartHeaderComponent],
  bootstrap: [PartHeaderComponent],
})
export class PartHeaderModule {}
