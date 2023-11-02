import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@shared/services';
import { BffParams } from '@shared/apis';
import { LoginRequest, LoginResponse } from '../models/login';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private api: ApiService) {}
  setScreen = 'login';
  execute(request: LoginRequest): Observable<LoginResponse> {
    return this.api.getJSONContent<LoginResponse>(
      new BffParams({ directory: [this.setScreen, 'login-post-send'] }),
      request
    );
  }
}
