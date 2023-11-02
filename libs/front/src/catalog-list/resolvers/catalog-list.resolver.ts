import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetCatalogListFirstViewService } from '../services';

@Injectable({ providedIn: 'root' })
export class CatalogListResolver {
  constructor(private getFirstView: GetCatalogListFirstViewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getFirstView.execute();
  }
}
