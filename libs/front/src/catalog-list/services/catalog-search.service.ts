import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import {
  CatalogListSearchRequest,
  CatalogListSearchResponse,
} from '../models/catalog-list';

@Injectable({ providedIn: 'root' })
export class CatalogSearchService {
  constructor(private api: ApiService) {}

  execute(
    request: CatalogListSearchRequest
  ): Observable<CatalogListSearchResponse> {
    return this.api.getJSONContent<CatalogListSearchResponse>(
      new BffParams({ directory: ['catalog-list', 'search'] }),
      request
    );
  }
}
