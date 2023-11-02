import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { CatalogIsEditRequest, CatalogIsEditResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogGetIsEditService {
  constructor(private api: ApiService) {}

  execute(request: CatalogIsEditRequest): Observable<CatalogIsEditResponse> {
    return this.api.getJSONContent<CatalogIsEditResponse>(
      new BffParams({ directory: ['catalog-edit', 'is-edit'] }),
      request
    );
  }
}
