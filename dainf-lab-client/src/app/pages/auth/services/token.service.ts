import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.accessToken ?? sessionStorage.getItem(this.TOKEN_KEY);
  }

  clearToken() {
    this.accessToken = null;
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
