import { Injectable } from '@angular/core';
import { GetCatalogDetailFirstViewService } from '../services';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CatalogDetailResolver {
  constructor(private getFirstView: GetCatalogDetailFirstViewService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const catalogId = route.params['id'];
    return this.getFirstView.execute({ catalogId });
  }
}
