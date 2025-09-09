import { AuthService } from '@/pages/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
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
  ],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
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
          <!-- <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button> -->
          <app-configurator />
        </div>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <app-user-dropdown [items]="userMenuItems"></app-user-dropdown>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppTopbar {
  userMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  router = new Router();

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
