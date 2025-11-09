import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { SearchRequest } from '@/shared/models/search';
import { TelefonePipe } from '@/shared/pipes/telefone.pipe';
import { Component, computed, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  standalone: true,
  imports: [
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    Select,
    Button,
    TooltipModule,
    ToggleSwitchModule
],
  selector: 'app-user',
  templateUrl: 'user.component.html',
  providers: [UserService, TelefonePipe],
})
export class UserComponent {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);
  telefonePipe = inject(TelefonePipe);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    nome: [null, Validators.required],
    telefone: [null],
    documento: [null],
    role: [null, Validators.required],
    password: [null, Validators.required],
    enabled: [true],
  });

  cols: Column<User>[] = [
    { field: 'email', header: 'E-mail' },
    { field: 'nome', header: 'Nome' },
    { field: 'telefone', header: 'Telefone', transform: (row: User) => this.telefonePipe.transform(row.telefone) },
    { field: 'documento', header: 'RA/SIAPE' },
  ];

  config: CrudConfig<User> = {
    title: 'Usuários',
  };

  roleOptions = [
    { label: 'Admin', value: 'ROLE_ADMIN' },
    { label: 'Professor', value: 'ROLE_PROFESSOR' },
    { label: 'Lab Technician', value: 'ROLE_LAB_TECHNICIAN' },
    { label: 'Student', value: 'ROLE_STUDENT' },
  ]

  filtroNome = model<string | undefined>();
  filtroDocumento = model<string | undefined>();

  searchRequest = computed<SearchRequest>(() => {
    const filters = [];
    if (this.filtroNome())
      filters.push({ field: 'nome', value: this.filtroNome(), type: 'ILIKE' });
    if (this.filtroDocumento())
      filters.push({
        field: 'documento',
        value: this.filtroDocumento(),
        type: 'ILIKE',
      });
    return <SearchRequest>{ filters };
  });
}
