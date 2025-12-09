import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService extends CrudService<User> {
  constructor() {
    super('users');
  }

  grantClearance(user: User): Observable<any> {
    return this._http.post<any>(`${this._url}/clearance`, user);
  }

  getCurrentUser(): Observable<User> {
    return this._http.get<User>(`${this._url}/me`);
  }

  getRole(): Observable<string> {
    return this.getCurrentUser().pipe(map((user) => user.role!));
  }

  isAdvancedRole(role?: string | null): boolean {
    return role === 'ROLE_LAB_TECHNICIAN' || role === 'ROLE_ADMIN';
  }

  hasAdvancedPrivileges(): Observable<boolean> {
    return this.getRole().pipe(map((role) => this.isAdvancedRole(role)));
  }
}
