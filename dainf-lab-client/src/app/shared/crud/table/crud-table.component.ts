import { Page } from '@/shared/models/search';
import { DeepValuePipe } from '@/shared/pipes/deep-value.pipe';
import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { Column, CrudConfig, Identifiable } from '../crud';

@Component({
  selector: 'app-crud-table',
  templateUrl: 'crud-table.component.html',
  imports: [
    CommonModule,
    TableModule,
    Button,
    Paginator,
    DeepValuePipe,
  ],
})
export class CrudTableComponent<T extends Identifiable> {
  table = viewChild(Table);

  columns = input<Column<T>[]>([]);
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  actionsTemplate = input<TemplateRef<any>>();
  items = input<Page<T> | undefined>(undefined);
  templateMap = input<Map<keyof T | string, TemplateRef<any>> | undefined>(new Map());

  editClick = output<T>();
  deleteOneClick = output<T>();
  pageChange = output<{ page: number; size: number }>();

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onPage(event: PaginatorState) {
    this.pageChange.emit({
      page: event.first! / event.rows!,
      size: event.rows!,
    });
  }

  edit(row: T) {
    this.editClick.emit(row);
  }

  deleteOne(row: T) {
    this.deleteOneClick.emit(row);
  }

  export() {
    this.table()!.exportCSV();
  }
}
