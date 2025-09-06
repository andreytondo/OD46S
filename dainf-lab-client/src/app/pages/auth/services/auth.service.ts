import { inject, Injectable } from '@angular/core';
import { AuthRequest, SignUpRequest } from '../auth';
import { Observable } from 'rxjs';
import { BaseService } from '@/shared/base.service';
import { TokenService } from './token.service';

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

  private readonly _tokenService = inject(TokenService);

  login(request: AuthRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request);
  }

  refresh(): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }

  signUp(request: SignUpRequest) {
    return this._http.post(`${this.apiUrl}/auth/sign-up`, request);
  }

  logout() {
    this._http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    this._tokenService.clearToken();
  }

}
