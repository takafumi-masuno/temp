import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartSideMenuComponent } from './part-side-menu.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [PartSideMenuComponent],
  imports: [CommonModule, CdkAccordionModule],
  exports: [PartSideMenuComponent],
  bootstrap: [PartSideMenuComponent],
})
export class PartSideMenuModule {}
