import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService extends CrudService<User> {
  constructor() {
    super('users');
  }

  getCurrentUser(): Observable<User> {
    return this._http.get<User>(`${this._url}/me`);
  }
}
