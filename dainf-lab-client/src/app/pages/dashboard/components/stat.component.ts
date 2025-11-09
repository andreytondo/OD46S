import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-stat',
  imports: [CommonModule],
  template: `
    <div class="card w-full">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">{{ label() }}</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            {{ value() }}
          </div>
        </div>
        <div
          class="flex items-center justify-center rounded-border"
          [ngClass]="iconBgClass()"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i [class]="'pi ' + iconClass()"></i>
        </div>
      </div>
      <span class="text-primary font-medium">{{ subLabel() }}</span>
      <span class="text-muted-color">&nbsp; {{ subText() }}</span>
    </div>
  `,
})
export class Stat {
  /** Label at the top (e.g. "Orders") */
  label = input<string>('Label');

  /** Main numeric/text value (e.g. "152") */
  value = input<number | string>(0);

  /** Optional small label under the value (e.g. "24 new") */
  subLabel = input<string>('');

  /** Additional text next to subLabel (e.g. "since last visit") */
  subText = input<string>('');

  /** PrimeIcons icon class (e.g. "pi-shopping-cart") */
  iconClass = input<string>('pi-shopping-cart');

  /** Background color class (e.g. "bg-blue-100 dark:bg-blue-400/10 text-blue-500") */
  iconBgClass = input<string>('bg-blue-100 dark:bg-blue-400/10 text-blue-500');
}
