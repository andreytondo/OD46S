import { BaseService } from '@/shared/services/base.service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest, RecoveryRequest, ResetPasswordRequest, SignUpRequest } from '../auth';
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
    return this._http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, {});
  }

  signUp(request: SignUpRequest) {
    return this._http.post(`${this.apiUrl}/auth/sign-up`, request);
  }

  logout() {
    this._http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    this._tokenService.clearToken();
  }

  requestPasswordRecovery(request: RecoveryRequest) {
    return this._http.post(`${this.apiUrl}/auth/recovery`, request);
  }

  resetPassword(request: ResetPasswordRequest) {
    return this._http.post(`${this.apiUrl}/auth/reset-password`, request);
  }

  confirmEmail(token: string) {
    return this._http.get(`${this.apiUrl}/auth/confirm-email`, { params: { token } });
  }

}
