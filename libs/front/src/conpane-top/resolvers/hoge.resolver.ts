import { Injectable } from '@angular/core';
import { HogeService } from '../services';

@Injectable({ providedIn: 'root' })
export class HogeResolver {
  constructor(private hogeService: HogeService) {}
  resolve() {
    // return this.hogeService.getHoge();
    console.log('');
  }
}
