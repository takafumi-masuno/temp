import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogListService } from './catalog-list.service';
import { GetCatalogsRequest, GetCatalogsResponse } from '@bff/models';
import { MsGetCatalogListService } from '@bff/microservices';
import { Observable, forkJoin, map } from 'rxjs';

@ApiTags('catalog-list')
@Controller('catalog-list')
export class CatalogListController {
  constructor(
    private readonly catalogListService: CatalogListService,
    private readonly msGetCatalogService: MsGetCatalogListService
  ) {}
  @Get('search')
  @ApiResponse({ status: 200 })
  /**
   * カタログ一覧を取得する
   */
  getCatalogList(
    @Query()
    params: GetCatalogsRequest<string>
  ): Observable<{
    data: GetCatalogsResponse<string>;
  }> {
    const catalogList = this.msGetCatalogService.getCatalogList(params);

    return forkJoin({ catalogList }).pipe(
      map((data) => ({
        data: this.catalogListService.getCatalogList(data.catalogList),
      }))
    );
  }
}
