import { Injectable } from '@angular/core';
import { AuthRequest, SignUpRequest } from '../auth';
import { Observable } from 'rxjs';
import { BaseService } from '@/shared/base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

  login(request: AuthRequest): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(`${this.apiUrl}/auth/login`, request);
  }

  signUp(request: SignUpRequest) {
    return this._http.post(`${this.apiUrl}/auth/sign-up`, request);
  }
}
