import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from '@bff/models';
import { MsGetUsersService } from '@bff/microservices';
import { forkJoin, map } from 'rxjs';

@ApiTags('shougou')
@Controller('shougou')
export class ShougouController {
  constructor(private readonly msGetUserService: MsGetUsersService) {}
  /**
   * 商号を取得する
   * @param params 商号検索リクエスト
   * @returns 商号
   */
  @Get('search')
  @ApiResponse({ status: 200 })
  getShougou(@Query() params: Users) {
    const users = this.msGetUserService.getUsers(params);

    return forkJoin({ users }).pipe(
      map((data) => ({
        data: data.users,
      }))
    );
  }
}
