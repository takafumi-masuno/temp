import { MsGetInfoPreviewService } from '@bff/microservices';
import { GetInfoPreviewRequest } from '@bff/models';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';
import { InfoPreviewService } from './info-preview.service';

@ApiTags('info-preview')
@Controller('info-preview')
/**
 * お知らせ情報controller
 */
export class InfoPreviewController {
  constructor(
    private readonly infoPreviewService: InfoPreviewService,
    private readonly msGetInfoPreviewService: MsGetInfoPreviewService
  ) {}
  @Get('first-view')
  @ApiResponse({ status: 200 })
  /**
   * firstViewを取得する
   */
  getFirstView(@Query() params: GetInfoPreviewRequest) {
    const infoPreview = this.msGetInfoPreviewService.getInfoPreview(params);

    return forkJoin({ infoPreview }).pipe(
      map((data) => ({
        data: this.infoPreviewService.convertToInfoPreview(data.infoPreview),
      }))
    );
  }
}
