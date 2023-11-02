import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { Observable, of } from 'rxjs';

@Injectable()
export class MsGetIsSessionService {
  constructor(private apiService: ApiService) {}
  public getIsSession(
    sessionId: string
  ): Observable<{ code: number; message?: string; detail?: string }> {
    const response = {
      code: 200,
      message: 'Success',
    };

    return of(response);

    /**
     * TODO: api実行処理
     */
    // return this.apiService.getJSONContent<GetUserInfoResponse>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['certification/session'],
    //   }),
    //   {sessionId}
    // );
  }
}
