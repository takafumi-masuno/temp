import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { CatalogEditRequest, CatalogEditResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogEditService {
  constructor(private api: ApiService) {}

  execute(request: CatalogEditRequest): Observable<CatalogEditResponse> {
    return this.api.postJSONContent<CatalogEditResponse>(
      new BffParams({ directory: ['catalog-edit', 'edit'] }),
      request
    );
  }
}
