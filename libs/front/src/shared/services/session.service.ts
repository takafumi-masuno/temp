import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private api: ApiService) {}

  getIsSession(
    sessionId: string
  ): Observable<{ code: number; message?: string; detail: string }> {
    return this.api.getJSONContent(
      new BffParams({ directory: ['session', 'isSession'] }),
      { sessionId }
    );
  }
}
