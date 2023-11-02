import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogRegisterService } from './catalog-register.service';
import { Catalog } from '@bff/models';
import { MsRegisterCatalogService } from '@bff/microservices';
import { forkJoin, map } from 'rxjs';

/**
 * カタログ登録controller
 */
@ApiTags('catalog-register')
@Controller('catalog-register')
export class CatalogRegisterController {
  constructor(
    private readonly catalogRegisterService: CatalogRegisterService,
    private readonly msCatalogRegisterService: MsRegisterCatalogService
  ) {}

  /**
   * カタログを登録する
   * @param params カタログ登録リクエスト
   * @returns 登録を行ったカタログ情報
   */
  @Post('register')
  @ApiResponse({ status: 200 })
  registerCatalog(@Body() params: Catalog) {
    const catalog = this.msCatalogRegisterService.registerCatalog({
      ...params,
      catalogTag: params.catalogTag ? params.catalogTag.split(',') : null,
    });

    return forkJoin({ catalog }).pipe(
      map((data) => ({
        data: this.catalogRegisterService.convertCatalog(data.catalog),
      }))
    );
  }
}
