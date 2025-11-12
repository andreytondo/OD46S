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
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { catchError, take, tap } from 'rxjs';
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
    ToggleSwitchModule,
  ],
  selector: 'app-user',
  templateUrl: 'user.component.html',
  providers: [UserService, TelefonePipe],
})
export class UserComponent {
  userService = inject(UserService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
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
    {
      field: 'telefone',
      header: 'Telefone',
      transform: (row: User) => this.telefonePipe.transform(row.telefone),
    },
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
  ];

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

  grantClearance(user: User) {
    this.confirmationService.confirm({
      header: 'Atenção!',
      message:
        'Ao emitir o documento de nada consta, o usuário será inativado no sistema. Deseja realmente emitir o documento?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => this._grantClearance(user),
    });
  }

  private _grantClearance(user: User) {
    this.userService
      .grantClearance(user)
      .pipe(
        take(1),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Documento emitido com sucesso.',
          });
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: err?.error?.message ||  'Falha ao emitir o documento.',
          });
          return err;
        }),
      )
      .subscribe();
  }
}
