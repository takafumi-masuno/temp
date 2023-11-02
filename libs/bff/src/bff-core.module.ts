import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UtilsLogNestLoggerModule } from '@shared/log';
import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class BffCoreModule {
  static forRoot(msConfig: any, logConfig: any): DynamicModule {
    return {
      module: BffCoreModule,
      providers: [{ provide: 'msConfig', useValue: msConfig }],
      imports: [UtilsLogNestLoggerModule.forRoot(logConfig)],
    };
  }
}
