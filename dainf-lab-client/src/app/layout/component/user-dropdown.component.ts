import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, MenuModule],
  template: `
    <p-menu [model]="items()" [popup]="true" #menu></p-menu>
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
  items = input<MenuItem[]>([]);
}
