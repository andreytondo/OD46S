import { UserService } from '@/pages/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, MenuModule, AvatarModule, DividerModule],
  template: `
    <p-menu
      [model]="items()"
      [popup]="true"
      appendTo="body"
      #menu
      styleClass="user-menu"
    >
      <ng-template pTemplate="start">
        <div class="flex items-center gap-3 px-3 py-2">
          <p-avatar
            [label]="userInitials()"
            shape="circle"
            size="large"
            styleClass="font-semibold"
          ></p-avatar>
          <div class="flex flex-col leading-tight">
            <span class="font-medium text-color">
              {{ user()?.nome ?? 'Carregando usuário' }}
            </span>
            <span class="text-sm text-color-secondary">
              {{ user()?.email ?? 'Sem e-mail' }}
            </span>
            <span class="text-xs text-color-secondary" *ngIf="user()?.role">
              {{ roleLabel() }}
            </span>
          </div>
        </div>
        <p-divider class="my-2" />
      </ng-template>
    </p-menu>
    <button
      type="button"
      class="layout-topbar-action"
      (click)="menu.toggle($event)"
    >
      <i class="pi pi-user"></i>
      <span>Profile</span>
    </button>
  `,
})
export class UserDropdownComponent {
  private readonly userService = inject(UserService);

  user = toSignal(this.userService.getCurrentUser().pipe(
    catchError(() => of(null))
  ));

  userInitials = computed(() => {
    const name = this.user()?.nome?.trim();
    if (!name) return '?';
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  roleLabel = computed(() => {
    const role = this.user()?.role;
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Administrador';
      case 'ROLE_LAB_TECHNICIAN':
        return 'Técnico de laboratório';
      case 'ROLE_STUDENT':
        return 'Estudante';
      default:
        return 'Usuário';
    }
  });

  items = input<MenuItem[]>([]);
}
