import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { PartImagePickerComponent } from './part-image-picker.component';

@NgModule({
  declarations: [PartImagePickerComponent],
  imports: [CommonModule, PushPipe],
  exports: [PartImagePickerComponent],
  bootstrap: [PartImagePickerComponent],
})
export class PartImagePickerModule {}
