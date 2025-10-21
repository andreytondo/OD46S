import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { LayoutService } from '../service/layout.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-logo',
  template: `
  @if (isDarkTheme()) {
    <img src="brand/logo-light-128x54.svg" alt="Logo" [style.width]="width()">
  } @else {
    <img src="brand/logo-dark-128x54.svg" alt="Logo" [style.width]="width()">
  }
  `
})
export class LogoComponent {

  width = input('6rem');
  private _layoutService = inject(LayoutService);
  isDarkTheme = computed(() => this._layoutService.isDarkTheme());

}
