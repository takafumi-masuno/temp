import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArrayContainsPipe,
  CfdAssetsPipe,
  RangePipe,
  NumOfArray,
} from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [CfdAssetsPipe, RangePipe, ArrayContainsPipe, NumOfArray],
  exports: [CfdAssetsPipe, RangePipe, ArrayContainsPipe, NumOfArray],
  providers: [CfdAssetsPipe],
})
export class ShareModule {}
