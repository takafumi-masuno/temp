import { Injectable } from '@angular/core';
import { BffParams } from '@shared/apis';
import { ApiService } from '@shared/services';

@Injectable({ providedIn: 'root' })
export class CatalogEditFirstViewService {
  constructor(private api: ApiService) {}

  execute(catalogId: number) {
    return this.api.getJSONContent(
      new BffParams({ directory: ['catalog-edit', 'first-view'] }),
      { catalogId }
    );
  }
}
