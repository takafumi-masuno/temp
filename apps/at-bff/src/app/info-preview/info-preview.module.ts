import { Module } from '@nestjs/common';
import { InfoPreviewController } from './info-preview.controller';
import {
  BffMicroservicesModule,
  MsGetInfoPreviewService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';
import { InfoPreviewService } from './info-preview.service';

@Module({
  controllers: [InfoPreviewController],
  providers: [InfoPreviewService, MsGetInfoPreviewService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
/**
 * お知らせ情報module
 */
export class InfoPreviewModule {}
