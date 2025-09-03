import { UserService } from './user.service';
import { Component, OnInit, inject } from '@angular/core';
import { CrudComponent } from '@/shared/crud/crud.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { User } from './user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Select } from 'primeng/select';

@Component({
  standalone: true,
  imports: [
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    Select,
  ],
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    name: [null, Validators.required],
    telefone: [null],
    documento: [null],
    password: [null, Validators.required],
  });

  cols: Column<User>[] = [
    { field: 'email', header: 'E-mail' },
    { field: 'password', header: 'Senha' },
  ];

  config: CrudConfig<User> = {
    title: 'Usuários',
  };

  ngOnInit() {}
}
