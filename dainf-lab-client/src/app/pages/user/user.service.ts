  import { CrudService } from '@/shared/crud/crud.service';
  import { Injectable } from '@angular/core';
  import { User } from './user';

@Injectable()
export class UserService extends CrudService<User> {
  constructor() {
    super('users');
  }
}
