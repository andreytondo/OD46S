import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { LowStockItem } from '../dashboard.service';

@Component({
  selector: 'app-low-stock-panel',
  standalone: true,
  imports: [CommonModule, SkeletonModule, TagModule, ProgressBarModule],
  template: `
    <div class="card h-full">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="font-semibold text-xl">Estoque crítico</div>
          <p class="text-sm text-muted-color">Itens que atingiram o mínimo definido</p>
        </div>
        <i class="pi pi-exclamation-triangle text-orange-400 text-xl"></i>
      </div>

      @if (loading()) {
        <div class="flex flex-col gap-3">
          @for (_ of skeletons; track $index) {
            <p-skeleton height="2.75rem" borderRadius="12px" />
          }
        </div>
      } @else if (items().length) {
        <div class="flex flex-col gap-4">
          @for (item of items(); track item.itemId) {
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-start gap-3">
                <div>
                  <div class="font-semibold leading-snug">{{ item.name }}</div>
                  <div class="text-sm text-muted-color">
                    {{ item.category || 'Sem categoria' }}
                  </div>
                  <div class="text-xs text-muted-color">
                    {{ item.quantity }} em estoque • mínimo {{ item.minimumStock }}
                  </div>
                </div>
                <p-tag
                  [value]="getTagLabel(item)"
                  [severity]="getTagSeverity(item)"
                  styleClass="text-xs"
                />
              </div>

              <p-progressBar
                [value]="item.percentage"
                [showValue]="false"
                [style]="{ height: '0.4rem' }"
              ></p-progressBar>
            </div>
          }
        </div>
      } @else {
        <div class="text-sm text-muted-color">
          Nenhum item está abaixo do estoque mínimo no momento.
        </div>
      }
    </div>
  `,
})
export class LowStockPanelComponent {
  items = input<LowStockItem[]>([]);
  loading = input<boolean>(false);

  skeletons = Array(4).fill(0);

  getTagSeverity(item: LowStockItem) {
    if (item.quantity <= 0) return 'danger';
    if (item.percentage < 50) return 'warn';
    return 'info';
  }

  getTagLabel(item: LowStockItem) {
    if (item.quantity <= 0) return 'Sem estoque';
    if (item.percentage < 50) return 'Crítico';
    return 'Atenção';
  }
}
