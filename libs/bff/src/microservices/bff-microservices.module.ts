import { DynamicModule, Module } from '@nestjs/common';
import { BffCoreModule } from '../bff-core.module';

@Module({})
export class BffMicroservicesModule {
  static forRoot(msConfig: any, logConfig: any): DynamicModule {
    return {
      module: BffMicroservicesModule,
      imports: [BffCoreModule.forRoot(msConfig, logConfig)],
      exports: [BffCoreModule],
    };
  }
}
