import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UserService } from '../user/user.service';

import { ItemComponent } from './item.component';
import { ItemCatalogComponent } from './item-catalog.component';

@Component({
  selector: 'app-item-wrapper',
  standalone: true,
  imports: [CommonModule, ItemComponent, ItemCatalogComponent],
  providers: [UserService],
  template: `
    <!-- 
      Lógica de Troca:
      1. Se for Aluno E NÃO tiver privilégios avançados -> Mostra Catálogo
      2. Caso contrário (Admin, Técnico, etc) -> Mostra Tabela de Gestão
    -->
    @if (isStudent() && !hasAdvancedPrivileges()) {
      <app-item-catalog></app-item-catalog>
    } 
    @else {
      <app-item></app-item>
    }
  `
})
export class ItemWrapperComponent {
  userService = inject(UserService);

  isStudent = toSignal(
    this.userService.getRole().pipe(
      map(role => role === 'ROLE_STUDENT')
    ), 
    { initialValue: false }
  );
  
  hasAdvancedPrivileges = toSignal(
    this.userService.hasAdvancedPrivileges(), 
    { initialValue: false }
  );
}