import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { ConpaneTopRoutingModule } from './conpane-top-routing.module';
import { ConpaneTopComponent } from './conpane-top.component';

@NgModule({
  declarations: [ConpaneTopComponent],
  imports: [CommonModule, ConpaneTopRoutingModule, PushPipe, RouterModule],
  exports: [RouterModule],
  bootstrap: [ConpaneTopComponent],
})
export class ConpaneTopModule {}
