import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import { Permissions, UserInfo } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getInfo(
    sessionId: string
  ): Observable<{ info: UserInfo; permissions: Permissions }> {
    return this.api.getJSONContent<{
      info: UserInfo;
      permissions: Permissions;
    }>(new BffParams({ directory: ['auth', 'user'] }), { sessionId });
  }
}
