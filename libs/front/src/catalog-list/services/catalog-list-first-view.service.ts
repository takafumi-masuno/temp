import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import { UserInfo } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class GetCatalogListFirstViewService {
  constructor(private api: ApiService) {}

  execute(): Observable<UserInfo> {
    return this.api.getJSONContent<UserInfo>(
      new BffParams({ directory: ['catalog-list', 'first-view'] }),
      {}
    );
  }
}
