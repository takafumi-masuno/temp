import {
  MsGetCatalogDetailService,
  MsDeleteCatalogService,
} from '@bff/microservices';
import { CatalogDetailRequest } from '@bff/models';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';
import { CatalogDetailService } from './catalog-detail.service';

@ApiTags('catalog-detail')
@Controller('catalog-detail')
export class CatalogDetailController {
  constructor(
    private catalogDetailService: CatalogDetailService,
    private msGetCatalogDetailService: MsGetCatalogDetailService,
    private msDeleteCatalogService: MsDeleteCatalogService
  ) {}
  @Get('first-view')
  @ApiResponse({ status: 200 })
  /**
   * firstViewを取得する
   */
  getFirstView(@Query() params: CatalogDetailRequest) {
    const catalog = this.msGetCatalogDetailService.getCatalogDetail(params);

    return forkJoin({ catalog }).pipe(
      map((data) => ({
        data: this.catalogDetailService.convertCatalogDetail(data.catalog),
      }))
    );
  }

  @Post('delete')
  @ApiResponse({ status: 200 })
  /**
   * カタログを削除する
   */
  deleteCatalog(@Body() body: { catalogId: number }) {
    const result = this.msDeleteCatalogService.deleteCatalog(body.catalogId);

    return forkJoin({ result }).pipe(
      map((data) => ({
        data: data.result,
      }))
    );
  }
}
