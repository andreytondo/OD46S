import { BaseService } from '@/shared/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from './config';

@Injectable({ providedIn: 'root' })
export class ConfigService extends BaseService {
  get(): Observable<Configuration> {
    return this._http.get<Configuration>(`${this.apiUrl}/configuration`);
  }

  update(config: Configuration): Observable<Configuration> {
    console.log(config)
    return this._http.put<Configuration>(
      `${this.apiUrl}/configuration`,
      config,
    );
  }
}
