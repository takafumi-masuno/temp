import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { UrlConstant } from '@athome-lib/csite-front/constants/csite';
import { ApiService } from '@shared/services';
import { BffParams } from '@shared/apis';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  PrecedentListResponse,
  PrecedentListRequest,
} from '@front/precedent-list/model/precedent-list';

@Injectable({ providedIn: 'root' })
export class PrecedentListService {
  constructor(private api: ApiService) {}

  setScreen = 'precedent-list';

  execute(): Observable<void> {
    const param = '';
    return this.api.getJSONContent<void>(
      new BffParams({ directory: [this.setScreen, 'first-view'] }),
      param
    );
  }

  searchPrecedentList(
    request: PrecedentListRequest
  ): Observable<PrecedentListResponse> {
    const param = request;
    return this.api.getJSONContent<PrecedentListResponse>(
      new BffParams({ directory: [this.setScreen, 'search'] }),
      param
    );
  }
}
