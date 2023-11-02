import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiConfig } from '@shared/models';
import { ApiErrorInterceptor } from '@shared/interceptors';
import { FirstViewCommonInterceptor, SessionInterceptor } from './interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [],
})
export class BackendsModule {
  static forRoot(apiConfig: ApiConfig): ModuleWithProviders<BackendsModule> {
    return {
      ngModule: BackendsModule,
      providers: [
        { provide: ApiConfig, useValue: apiConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FirstViewCommonInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SessionInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiErrorInterceptor,
          multi: true,
        },
      ],
    };
  }
}
