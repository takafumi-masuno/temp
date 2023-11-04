import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartVisibilitySettingsFormComponent } from './part-visibility-settings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PartVisibilitySettingsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PartVisibilitySettingsFormComponent],
  bootstrap: [PartVisibilitySettingsFormComponent],
})
export class PartVisibilitySettingsFormModule {}
