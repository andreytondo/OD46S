import { UserService } from './user.service';
import { Component, OnInit, inject } from '@angular/core';
import { CrudComponent } from '@/shared/crud/crud.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { User } from './user';
import { Button } from 'primeng/button';

@Component({
  standalone: true,
  imports: [CrudComponent, Button],
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
  cols: Column<User>[] = [
    { field: 'email', header: 'E-mail' },
    { field: 'password', header: 'Senha' },
  ];

  config: CrudConfig<User> = {
    title: 'Usuários',
  }

  userService = inject(UserService);

  ngOnInit() {}
}
