import { DynamicModule, Module } from '@nestjs/common';
import { AtLoggerService } from './at-logger.service';
import { AtLoggerMiddleware } from './at-logger.middleware';

@Module({
  controllers: [],
  providers: [AtLoggerMiddleware],
  exports: [AtLoggerMiddleware],
})
export class UtilsLogNestLoggerModule {
  static forRoot(logConfig: {
    logRootPath: string;
    type: string;
    pm2Enabled: boolean;
    pm2InstanceVar: string;
  }): DynamicModule {
    return {
      module: UtilsLogNestLoggerModule,
      providers: [
        { provide: 'logConfig', useValue: logConfig },
        {
          provide: AtLoggerService,
          useFactory: () => {
            return new AtLoggerService(logConfig);
          },
        },
      ],
      exports: [
        {
          provide: AtLoggerService,
          useFactory: () => {
            return new AtLoggerService(logConfig);
          },
        },
      ],
    };
  }
}
