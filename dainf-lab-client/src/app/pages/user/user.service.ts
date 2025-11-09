import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService extends CrudService<User> {
  constructor() {
    super('users');
  }

  getCurrentUser(): Observable<User> {
    return this._http.get<User>(`${this._url}/me`);
  }

  getRole(): Observable<string> {
    return this.getCurrentUser().pipe(map((user) => user.role!));
  }

  hasAdvancedPrivileges(): Observable<boolean> {
    return this.getRole().pipe(
      map((role) => role === 'ROLE_LAB_TECHNICIAN' || role === 'ROLE_ADMIN'),
    );
  }
}
