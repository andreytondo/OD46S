import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

// Models e Services
import { User } from '@/pages/user/user';
import { UserService } from '@/pages/user/user.service';

// Imports de PrimeNG
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true,
    },
  ],
  // Template HTML foi adicionado diretamente aqui
  template: `
    <p-select
      [options]="(users$ | async) || []"
      [(ngModel)]="value"
      (onChange)="onChange($event.value)"
      (onBlur)="onTouched()"
      optionLabel="nome"
      placeholder="Selecione um usuário"
      [showClear]="true"
      [filter]="true"
      filterBy="nome,email,documento"
      styleClass="w-full"
      [disabled]="disabled"
    >
      <ng-template let-user pTemplate="item">
        <div>
          <div>{{ user.nome }}</div>
          <small class="text-gray-500">{{ user.email }}</small>
        </div>
      </ng-template>
    </p-select>
  `,
})
export class UserSelectComponent implements OnInit, ControlValueAccessor {
  userService = inject(UserService);
  users$!: Observable<User[]>;

  value: User | null = null;
  disabled: boolean = false;

  onChange: (value: User | null) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.users$ = this.userService
      .search({ page: 0, rows: 1000 })
      .pipe(map((page) => page.content));
  }

  writeValue(value: User | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: User | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
