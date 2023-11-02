import { Injectable } from '@angular/core';
import {
  Resolve,
  // RouterStateSnapshot,
  // ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PrecedentListService } from '../service/precedent-list.service';

@Injectable({ providedIn: 'root' })
export class PrecedentListResolver implements Resolve<void> {
  constructor(private precedentListService: PrecedentListService) {}
  resolve(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<void> {
    return this.precedentListService.execute();
  }
}
