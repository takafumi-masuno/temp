import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../shared/share.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    PushPipe,
    NotFoundRoutingModule,
    ShareModule,
    RouterModule,
  ],
  exports: [RouterModule],
  bootstrap: [NotFoundComponent],
})
export class NotFoundModule {}
