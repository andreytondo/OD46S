import { MenuService } from '@/shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li
        app-menuitem
        *ngIf="!item.separator"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
      @if (item.separator) {
        <li class="menu-separator"></li>
      }
    </ng-container>
  </ul> `,
})
export class AppMenu {
  model: MenuItem[] = [];

  constructor(private _menuService: MenuService) {}

  ngOnInit() {
    this._menuService.getMenu().subscribe((menuItems) => {
      this.model = menuItems.items;
    });
  }
}
