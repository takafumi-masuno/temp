import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PartHeaderModule } from '../components/part-header';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartErrorModule } from '../components/part-error';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    PushPipe,
    LoginRoutingModule,
    PartHeaderModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartErrorModule,
  ],
  exports: [RouterModule],
  bootstrap: [LoginComponent],
})
export class LoginModule {}
