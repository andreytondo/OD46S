import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { CartService } from '@/shared/services/cart.service';
import { StorageImplService } from '@/shared/storage/storage-impl.service';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    TooltipModule,
    SelectButtonModule,
    PaginatorModule,
  ],
  providers: [ItemService],
  templateUrl: './item-catalog.component.html',
  styles: [`
    :host {
      display: block;
    }
    .product-image {
      width: 100%;
      height: 180px;
      object-fit: contain;
      border-radius: 8px;
    }
    .image-container {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--surface-ground);
        border-radius: 8px;
        margin-bottom: 1rem;
    }
    .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--text-color-secondary);
    }
    .debug-bar {
        background: var(--surface-card);
        color: var(--text-color);
        padding: 0.5rem;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        border: 1px solid var(--surface-border);
    }
  `]
})
export class ItemCatalogComponent implements OnInit, OnDestroy {
  itemService = inject(ItemService);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);
  storageService = new StorageImplService(
    `${this.itemService._url}/storage`,
    'item',
  );

  nameFilter = model<string>('');
  layout: 'grid' | 'list' = 'grid';

  items = signal<Item[]>([]);
  totalRecords = signal(0);
  loading = signal(true);
  imageUrls = signal<Record<string, string>>({});

  first = signal(0);
  rows = signal(12);
  private filterDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  readonly placeholderImage = 'assets/images/placeholder.png';

  layoutOptions = [
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-table', value: 'grid' },
  ];

  searchRequest = computed<SearchRequest>(() => {
    const filters: SearchFilter[] = [];
    if (this.nameFilter()) {
      filters.push({ field: 'name', value: this.nameFilter(), type: 'ILIKE' });
    }
    return {
      filters,
      page: this.first() / this.rows(),
      rows: this.rows(),
      sort: { field: 'name', type: 'ASC' },
    };
  });

  ngOnInit() {
    this.loadItems();
  }

  ngOnDestroy() {
    if (this.filterDebounceTimer) {
      clearTimeout(this.filterDebounceTimer);
    }
  }

  loadItems() {
    this.loading.set(true);

    this.itemService.search(this.searchRequest()).subscribe({
      next: (page) => {
        if (page && page.content) {
            this.items.set(page.content);
            this.totalRecords.set(page.page?.totalElements || page.content.length);
            page.content.forEach((item) => this.prefetchImageForItem(item));
        } else {
            this.items.set([]);
        }

        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar:', err);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.loadItems();
  }

  onFilterChange() {
    this.first.set(0);
    if (this.filterDebounceTimer) {
      clearTimeout(this.filterDebounceTimer);
    }
    this.filterDebounceTimer = setTimeout(() => this.loadItems(), 300);
  }

  addToCart(item: Item) {
    this.cartService.addItem(item);
  }

  getSeverity(item: Item) {
    if (item.quantity === 0) return 'danger';
    if (item.quantity < (item.minimumStock || 5)) return 'warning';
    return 'success';
  }

  getStockStatus(item: Item) {
    if (item.quantity === 0) return 'ESGOTADO';
    if (item.quantity < (item.minimumStock || 5)) return 'BAIXO ESTOQUE';
    return 'DISPONÍVEL';
  }

  getImageUrl(item: Item): string {
    const key = String(item.id);
    return this.imageUrls()[key] || this.placeholderImage;
  }

  hasImage(item: Item): boolean {
    const key = String(item.id);
    const url = this.imageUrls()[key];
    return !!url && url !== this.placeholderImage;
  }

  onImageError(item: Item) {
    const key = String(item.id);
    this.imageUrls.update((urls) => ({ ...urls, [key]: this.placeholderImage }));
  }

  private prefetchImageForItem(item: Item) {
    const imagePath = this.extractImagePath(item.images);
    const key = String(item.id);

    if (!imagePath || this.imageUrls()[key]) return;

    if (imagePath.startsWith('http')) {
      this.imageUrls.update((urls) => ({ ...urls, [key]: imagePath }));
      return;
    }

    this.storageService.getSignedUrl(imagePath, 'GET').subscribe({
      next: (url) =>
        this.imageUrls.update((urls) => ({ ...urls, [key]: url })),
      error: (err) =>
        console.error('Erro ao carregar imagem do item', {
          id: item.id,
          error: err,
        }),
    });
  }

  private extractImagePath(images: any): string | undefined {
    if (!images) return undefined;

    if (Array.isArray(images)) {
      const [first] = images;
      if (!first) return undefined;
      if (typeof first === 'string') return first;
      if (typeof first === 'object' && first.name) return first.name;
    }

    if (typeof images === 'string') return images;
    if (typeof images === 'object' && images.name) return images.name;

    return undefined;
  }
}
