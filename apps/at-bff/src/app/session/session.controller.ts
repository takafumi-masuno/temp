import { MsGetIsSessionService } from '@bff/microservices';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';

@Controller('session')
export class SessionController {
  constructor(private readonly msGetIsSessionService: MsGetIsSessionService) {}
  @Get('isSession')
  @ApiResponse({ status: 200 })
  getIsSession(@Query() params: { sessionId: string }) {
    const isSession = this.msGetIsSessionService.getIsSession(params.sessionId);

    return forkJoin({ isSession }).pipe(
      map((data) => ({
        data: data.isSession,
      }))
    );
  }
}
