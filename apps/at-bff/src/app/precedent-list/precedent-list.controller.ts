import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrecedentListService } from './precedent-list.service';
import { MsPrecedentListService } from '@bff/microservices/ms-precedent-list-service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrecedentListRequest } from '@front/precedent-list/model/precedent-list';
import { forkJoin, map } from 'rxjs';

@ApiTags('precedent-list')
@Controller('precedent-list')
export class PrecedentListController {
  constructor(
    private readonly precedentListService: PrecedentListService,
    private readonly msPrecedentListService: MsPrecedentListService
  ) {}

  /**
   * 建築事例一覧取得
   */
  @Get('search')
  @ApiResponse({ status: 200 })
  getPrecedentList(@Query() request: PrecedentListRequest) {
    const precedentList = this.msPrecedentListService.getPrecedentList(request);

    return forkJoin({ precedentList }).pipe(
      map((data) =>
        this.precedentListService.getPrecedentList(data.precedentList)
      )
    );
  }
}
