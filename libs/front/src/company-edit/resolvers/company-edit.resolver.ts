import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CompanyEditService } from '../services/company-edit.service';

/**
 * 建築会社変更Resolver
 */
@Injectable({ providedIn: 'root' })
export class CompanyEditResolver {
  constructor(private companyEditService: CompanyEditService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const kenchikuKaishaId = route.params['kenchikuKaishaId'];
    return this.companyEditService.getCompanyEditFirstView(kenchikuKaishaId);
  }
}
