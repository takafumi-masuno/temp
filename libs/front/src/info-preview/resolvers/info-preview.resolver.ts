import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetInfoPreviewFirstViewService } from '../services';

@Injectable({ providedIn: 'root' })
/**
 * お知らせ情報resolver
 */
export class InfoPreviewResolver {
  constructor(private getFirstView: GetInfoPreviewFirstViewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const oshiraseId = route.params['id'];
    return this.getFirstView.execute(oshiraseId);
  }
}
