import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';
import {
  MsGetPermissionsService,
  MsGetUserInfoService,
} from '@bff/microservices';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly msGetUserInfoService: MsGetUserInfoService,
    private readonly msGetPermissionsService: MsGetPermissionsService
  ) {}

  @Get('user')
  @ApiResponse({ status: 200 })
  getUserInfo(@Query() params: { sessionId: string }) {
    const userInfo = this.msGetUserInfoService.getUserInfo(params.sessionId);
    const permissions = this.msGetPermissionsService.getUserPermissions(
      params.sessionId
    );

    return forkJoin({ userInfo, permissions }).pipe(
      map((data) => ({
        data: {
          info: data.userInfo,
          permissions: {
            atUser: data.permissions.atUser ? data.permissions.atUser : null,
            kenchikuKaishaUser: data.permissions.kenchikuKaishaUser
              ? data.permissions.kenchikuKaishaUser
              : null,
          },
        },
      }))
    );
  }
}
