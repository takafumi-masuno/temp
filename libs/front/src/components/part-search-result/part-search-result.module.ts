import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ShareModule } from '../../shared/share.module';
import { PartSearchResultComponent } from './part-search-result.component';

@NgModule({
  declarations: [PartSearchResultComponent],
  imports: [
    CommonModule,
    PushPipe,
    ShareModule,
    RouterModule,
    CdkAccordionModule,
  ],
  exports: [RouterModule, PartSearchResultComponent],
  bootstrap: [PartSearchResultComponent],
})
export class PartSearchResultModule {}
