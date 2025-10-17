import { Category } from '@/pages/category/category';
import { CategoryService } from '@/pages/category/category.service';
import { SearchRequest } from '@/shared/models/search';
import { CategoryTreeNodePipe } from '@/shared/pipes/category-tree-node.pipe';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { map, Observable, take, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TreeSelectModule, FormsModule],
  selector: 'app-category-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-treeselect
      class="w-full"
      [(ngModel)]="selectedNodeKey"
      [loading]="loading"
      (onNodeSelect)="onNodeSelect($event)"
      (onNodeUnselect)="onNodeUnselect()"
      [options]="nodes"
      [metaKeySelection]="false"
      selectionMode="single"
      placeholder="Selecione uma categoria"
      appendTo="body"
      [disabled]="disabled"
    >
      <ng-template pTemplate="value">
        @if (value) {
          <div class="flex text-center items-center gap-2">
            <i [class]="value.icon"></i>
            <span> {{ value.description }}</span>
          </div>
        } @else {
          <ng-container>{{ 'Selecione uma categoria' }}</ng-container>
        }
      </ng-template>
    </p-treeselect>
  `,
})
export class CategorySelectComponent implements OnInit, ControlValueAccessor {
  nodes: TreeNode<Category>[] = [];
  selectedNodeKey?: TreeNode<Category>[]; // usado só pelo treeselect
  value: Category | null = null; // o valor externo (ControlValueAccessor)

  loading: boolean = false;
  disabled: boolean = false;

  categoryService = inject(CategoryService);
  categoryTreeNodePipe = inject(CategoryTreeNodePipe);

  ngOnInit() {
    this._loadInitialData().subscribe();
  }

  onNodeSelect(event: TreeNodeSelectEvent) {
    if (event.node.data) {
      this.value = event.node.data;
    } else {
      this.value = null;
    }
    this.onChange(this.value);
    this.onTouched();
  }

  onNodeUnselect() {
    this.value = null;
    this.onChange(this.value);
    this.onTouched();
  }

  onChange: (value: Category | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: Category | null): void {
    this.value = value;
    this.selectedNodeKey = value ? this.categoryTreeNodePipe.transform([value]) : undefined;
  }

  registerOnChange(fn: (value: Category | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _loadInitialData(): Observable<TreeNode<Category>[]> {
    return this._loadData({
      page: 0,
      rows: 100,
      filters: [{ field: 'parent', type: 'IS_NULL' }],
    });
  }

  private _loadData(request: SearchRequest): Observable<TreeNode<Category>[]> {
    return this.categoryService.search(request).pipe(
      take(1),
      map((page) => this.categoryTreeNodePipe.transform(page.content)),
      tap((nodes) => (this.nodes = nodes)),
    );
  }
}
