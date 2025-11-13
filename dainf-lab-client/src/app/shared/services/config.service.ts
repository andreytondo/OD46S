import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private config: { apiUrl: string } = { apiUrl: '' };

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return this.http.get<any>('/config/config.json').pipe(
      tap((config) => (this.config = config)),
      take(1),
    );
  }

  get apiUrl(): string {
    return this.config?.apiUrl;
  }
}
