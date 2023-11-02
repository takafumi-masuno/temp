import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import { InfoListSearchRequest, InfoListSearchResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class InfoListSearchService {
  constructor(private api: ApiService) {}

  execute(request: InfoListSearchRequest): Observable<InfoListSearchResponse> {
    return this.api.getJSONContent<InfoListSearchResponse>(
      new BffParams({ directory: ['info-list', 'search'] }),
      request
    );
  }
}
