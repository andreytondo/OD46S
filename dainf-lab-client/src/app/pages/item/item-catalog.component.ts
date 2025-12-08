import { ChangeDetectorRef, Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';

import { CartService } from '@/shared/services/cart.service';
import { SearchRequest, SearchFilter } from '@/shared/models/search';
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
      mix-blend-mode: multiply;
    }
    .image-container {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f9fafb;
        border-radius: 8px;
        margin-bottom: 1rem;
    }
    .empty-state {
        text-align: center;
        padding: 3rem;
        color: #6b7280;
    }
    .debug-bar {
        background: #fef3c7;
        color: #92400e;
        padding: 0.5rem;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        border: 1px solid #f59e0b;
    }
  `]
})
export class ItemCatalogComponent implements OnInit {
  itemService = inject(ItemService);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef); 

  nameFilter = model<string>('');
  layout: 'grid' | 'list' = 'grid';

  items = signal<Item[]>([]);
  totalRecords = signal(0);
  loading = signal(true);
  
  first = signal(0);
  rows = signal(12);

  layoutOptions = [
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-table', value: 'grid' },
  ];

  getStorageUrl(path: string | string[] | undefined): string {
    if (!path) return 'assets/images/placeholder.png';
    
    if (Array.isArray(path) && path.length === 0) return 'assets/images/placeholder.png';

    let actualPath = path;
    if (Array.isArray(path)) {
        actualPath = path[0];
    }
    
    if (typeof actualPath === 'string' && actualPath.startsWith('http')) {
        return actualPath;
    }

    return `${this.itemService._url}/storage/${actualPath}`;
  }

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

  loadItems() {
    this.loading.set(true);
    
    this.itemService.search(this.searchRequest()).subscribe({
      next: (page) => {
        console.log('Dados recebidos (Raw):', page); 

        if (page && page.content) {
            this.items.set(page.content);
            this.totalRecords.set(page.page?.totalElements || page.content.length);
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
    this.loadItems();
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
}