import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetLoginRequest, GetLoginResponse } from '@bff/models';
import { MsGetLoginsService } from '@bff/microservices';
import { Observable, forkJoin, map } from 'rxjs';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly msGetLoginsService: MsGetLoginsService) {}
  @Get('login-post-send')
  @ApiResponse({ status: 200 })
  /**
   * ログインする
   */
  loginPostSend(
    @Query() params: GetLoginRequest
  ): Observable<{ data: GetLoginResponse }> {
    const loginInfo = this.msGetLoginsService.getLoginInfo(params);
    return forkJoin({ loginInfo }).pipe(
      map((data) => ({
        data: data.loginInfo,
      }))
    );
  }
}
