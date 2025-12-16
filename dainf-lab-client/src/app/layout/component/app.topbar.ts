import { AuthService } from '@/pages/auth/services/auth.service';
import { CartComponent } from '@/shared/components/cart-component/cart.component';
import { CartService } from '@/shared/services/cart.service';
import { ContextStore } from '@/shared/store/context-store.service';
import { UserService } from '@/pages/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { PopoverModule } from 'primeng/popover';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { map } from 'rxjs';
import { LayoutService } from '../service/layout.service';
import { AppConfigurator } from './app.configurator';
import { LogoComponent } from './logo.component';
import { UserDropdownComponent } from './user-dropdown.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    AppConfigurator,
    LogoComponent,
    UserDropdownComponent,
    BadgeModule,
    TooltipModule,
    PopoverModule,
    CartComponent,
  ],
  providers: [UserService],
  template: `
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">
        <button
          class="layout-menu-button layout-topbar-action"
          (click)="layoutService.onMenuToggle()"
        >
          <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/dashboard">
          <app-logo></app-logo>
          <span>DAINF</span>
        </a>
      </div>

      <div class="layout-topbar-actions">
        <div class="layout-config-menu">
          <button
            type="button"
            class="layout-topbar-action"
            (click)="toggleDarkMode()"
            pTooltip="Mudar Tema"
            tooltipPosition="bottom"
          >
            <i
              [ngClass]="{
                'pi ': true,
                'pi-moon': layoutService.isDarkTheme(),
                'pi-sun': !layoutService.isDarkTheme(),
              }"
            ></i>
          </button>
          <div class="relative">
            <app-configurator />
          </div>
        </div>

        <button
          class="layout-topbar-menu-button layout-topbar-action lg:hidden"
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveToClass="hidden"
          leaveActiveClass="animate-fadeout"
          [hideOnOutsideClick]="true"
        >
          <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu hidden w-16 lg:flex lg:items-center pr-4">
          <div class="layout-topbar-menu-content flex items-start justify-start gap-2 ">

            @if (userCanUseCart$ | async) {
              <!-- BOTÃO DO CARRINHO -->
              <button
                class="layout-topbar-action max-w-min p-overlay-badge"
                pTooltip="Carrinho de Itens"
                tooltipPosition="bottom"
                (click)="cartPopover.toggle($event)"
              >
                <i class="pi pi-shopping-cart text-lg"></i>
                @if (cartItemCount() > 0) {
                  <p-badge [value]="cartItemCount()" severity="danger"></p-badge>
                }
              </button>

              <!-- POPOVER -->
              <p-popover #cartPopover [dismissable]="true">
                <app-cart></app-cart>
              </p-popover>
            }

            <!-- USUÁRIO -->
            <app-user-dropdown [items]="userMenuItems"></app-user-dropdown>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .cart-popover {
      width: 350px;
      padding: 0;
      overflow: hidden;
    }
  `]
})
export class AppTopbar implements OnInit {
  userMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);
  userService = inject(UserService);
  context = inject(ContextStore);

  cartItemCount = this.cartService.itemCount;
  userCanUseCart$ = this.userService
    .hasAdvancedPrivileges()
    .pipe(map((hasPrivileges) => !hasPrivileges));

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  logout() {
    this.cartService.resetCartState();
    this.context.clear();
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
