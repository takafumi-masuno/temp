import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, forkJoin, map } from 'rxjs';
import { InfoListService } from './info-list.service';
import { MsGetInfoListService } from '@bff/microservices';
import { GetInfoListRequest, GetInfoListResponse } from '@bff/models';

@ApiTags('info-list')
@Controller('info-list')
export class InfoListController {
  constructor(
    private infoListService: InfoListService,
    private msGetInfoListService: MsGetInfoListService
  ) {}
  @Get('search')
  @ApiResponse({ status: 200 })
  /**
   * お知らせ一覧を取得する
   */
  getInfoList(
    @Query() params: GetInfoListRequest<string>
  ): Observable<{ data: GetInfoListResponse<string> }> {
    const infoList = this.msGetInfoListService.getInfoList(params);

    return forkJoin({ infoList }).pipe(
      map((data) => ({
        data: this.infoListService.convertToInfoList(data.infoList),
      }))
    );
  }
}
