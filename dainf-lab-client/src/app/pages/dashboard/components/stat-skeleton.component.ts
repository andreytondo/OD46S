import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-stat-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `
    <div
      class="card rounded-2xl p-5 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 shadow-sm flex flex-col gap-4"
    >
      <div class="flex justify-between items-start">
        <p-skeleton width="2.5rem" height="2.5rem" borderRadius="50%" />
        <p-skeleton width="2rem" height="1rem" borderRadius="0.5rem" />
      </div>
      <p-skeleton width="60%" height="1.75rem" borderRadius="0.5rem" />
      <p-skeleton width="40%" height="1rem" borderRadius="0.25rem" />
    </div>
  `,
})
export class StatSkeletonComponent {}
