import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { InventoryOperation } from '../dashboard.service';

@Component({
  selector: 'app-recent-operations',
  standalone: true,
  imports: [CommonModule, SkeletonModule, TagModule],
  template: `
    <div class="card h-full">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="font-semibold text-xl">Últimas movimentações</div>
          <p class="text-sm text-muted-color">
            Entradas, saídas e devoluções mais recentes
          </p>
        </div>
        <i class="pi pi-history text-primary text-xl"></i>
      </div>

      @if (loading()) {
        <div class="flex flex-col gap-3">
          @for (_ of skeletons; track $index) {
            <p-skeleton height="3rem" borderRadius="12px" />
          }
        </div>
      } @else if (operations()?.length) {
        <div class="flex flex-col gap-4">
          @for (op of operations(); track op.id) {
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div [ngClass]="getIconClasses(op)">
                  <i class="pi" [ngClass]="op.iconClass"></i>
                </div>
                <div class="leading-tight">
                  <div class="font-medium">{{ op.itemName }}</div>
                  <div class="text-sm text-muted-color">
                    {{ op.userName }} • {{ op.date | date: 'dd/MM/yyyy' }}
                  </div>
                  <div class="text-xs text-muted-color">Qtd: {{ op.quantity }}</div>
                </div>
              </div>
              <p-tag
                [value]="op.label"
                [severity]="op.severity || undefined"
                styleClass="text-xs"
              />
            </div>
          }
        </div>
      } @else {
        <div class="text-sm text-muted-color">
          Nenhuma movimentação recente encontrada para o período.
        </div>
      }
    </div>
  `,
})
export class RecentOperationsComponent {
  operations = input<InventoryOperation[]>([]);
  loading = input<boolean>(false);

  skeletons = Array(5).fill(0);

  getIconClasses(op: InventoryOperation): string {
    const base = 'w-10 h-10 rounded-full flex items-center justify-center';
    const palette = this.resolvePalette(op.severity);
    return `${base} ${palette}`;
  }

  private resolvePalette(severity: InventoryOperation['severity']): string {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-600 dark:bg-green-400/10';
      case 'info':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-400/10';
      case 'warn':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-400/10';
      case 'danger':
        return 'bg-red-100 text-red-600 dark:bg-red-400/10';
      default:
        return 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-0';
    }
  }
}
