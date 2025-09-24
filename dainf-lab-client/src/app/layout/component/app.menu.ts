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
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            @if (item.separator) {
              <li class="menu-separator"></li>
            }
        </ng-container>
    </ul> `
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Início',
        items: [
          { label: 'Dashboard', icon: 'pi pi-home' },
        ]
      },
      {
        label: 'Operações',
        items: [
          { label: 'Empréstimo', icon: 'pi pi-clock', routerLink: '/pages/loan' },
          { label: 'Retirada', icon: 'pi pi-sign-out' },
          { label: 'Reserva', icon: 'pi pi-calendar' }
        ]
      },
      {
        label: 'Compras',
        items: [
          { label: 'Nova Compra', icon: 'pi pi-shopping-cart', routerLink: '/pages/compra' },
          { label: 'Solicitar Compra', icon: 'pi pi-receipt' }
        ]
      },
      {
        label: 'Cadastros',
        items: [
          { label: 'Itens', icon: 'pi pi-box', routerLink: '/pages/item' },
          { label: 'Categorias', icon: 'pi pi-list', routerLink: '/pages/category' },
          { label: 'Fornecedores', icon: 'pi pi-truck', routerLink: '/pages/fornecedores' },
          { label: 'Usuários', icon: 'pi pi-users', routerLink: '/pages/user' }
        ]
      }
    ];
  }
}
