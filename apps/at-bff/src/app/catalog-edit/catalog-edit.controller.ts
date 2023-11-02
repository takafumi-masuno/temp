import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogEditService } from './catalog-edit.service';
import { forkJoin, map } from 'rxjs';
import {
  MsEditCatalogService,
  MsGetCatalogDetailService,
  MsGetCatalogIsEditService,
} from '@bff/microservices';
import {
  CatalogDetailRequest,
  CatalogIsEditRequest,
  EditCatalogRequest,
} from '@bff/models';

@ApiTags('catalog-edit')
@Controller('catalog-edit')
export class CatalogEditController {
  constructor(
    private readonly catalogEditService: CatalogEditService,
    private readonly msGetCatalogDetailService: MsGetCatalogDetailService,
    private readonly msEditCatalogService: MsEditCatalogService,
    private readonly msGetCatalogIsEditService: MsGetCatalogIsEditService
  ) {}
  @Get('first-view')
  @ApiResponse({ status: 200 })
  getCatalog(@Query() params: CatalogDetailRequest) {
    const catalog = this.msGetCatalogDetailService.getCatalogDetail(params);

    return forkJoin({ catalog }).pipe(
      map((data) => ({
        data: this.catalogEditService.convertToCatalog(data.catalog),
      }))
    );
  }

  @Post('edit')
  @ApiResponse({ status: 200 })
  updateCatalog(@Body() params: EditCatalogRequest) {
    const catalog = this.msEditCatalogService.updateCatalog(params);

    return forkJoin({ catalog }).pipe(
      map((data) => ({
        data: this.catalogEditService.convertToCatalog(data.catalog),
      }))
    );
  }

  @Get('is-edit')
  @ApiResponse({ status: 200 })
  getIsEdit(@Query() params: CatalogIsEditRequest) {
    const isEdit = this.msGetCatalogIsEditService.getIsEdit(params);

    return forkJoin({ isEdit }).pipe(map((data) => ({ data: data.isEdit })));
  }
}
