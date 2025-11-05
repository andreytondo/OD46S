import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({providedIn: 'root'})
export class MenuService extends BaseService {

  getMenu(): Observable<{items: MenuItem[]}> {
    return this._http.get<{items: MenuItem[]}>(`${this.apiUrl}/menu`);
  }

}
