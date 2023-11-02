import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ShareModule } from '../../shared/share.module';
import { PartPaginationComponent } from './part-pagination.component';

@NgModule({
  declarations: [PartPaginationComponent],
  imports: [
    CommonModule,
    PushPipe,
    ShareModule,
    RouterModule,
    CdkAccordionModule,
  ],
  exports: [RouterModule, PartPaginationComponent],
  bootstrap: [PartPaginationComponent],
})
export class PartPaginationModule {}
