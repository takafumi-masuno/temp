import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@shared/services';
import { BffParams } from '@shared/apis';

@Injectable({ providedIn: 'root' })
export class HogeService {
  constructor(private api: ApiService) {}

  execute(): Observable<boolean> {
    const params = new BffParams({ directory: ['top', 'hoge'] });
    return this.api.getJSONContent<boolean>(params, '');

    // public getHoge(): void {
    //   console.log('hoge');
    // }
  }
}
