import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { EnvironmentService } from './config.service';

export abstract class BaseService {
  protected readonly _http = inject(HttpClient);
  protected readonly environmentService = inject(EnvironmentService);
  protected get apiUrl(): string {
    return this.environmentService.apiUrl;
  }
}
