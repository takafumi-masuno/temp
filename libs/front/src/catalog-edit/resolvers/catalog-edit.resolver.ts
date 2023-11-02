import { Injectable } from '@angular/core';
import { CatalogEditFirstViewService } from '../services';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CatalogEditResolver {
  constructor(private getFirstView: CatalogEditFirstViewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const catalogId = route.params['id'];
    return this.getFirstView.execute(catalogId);
  }
}
