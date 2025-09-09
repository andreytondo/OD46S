import { Page } from '@/shared/models/search';
import { CommonModule } from '@angular/common';
import { Component, input, output, TemplateRef, viewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { Column, CrudConfig, Identifiable } from '../crud';

@Component({
  selector: 'app-crud-table',
  templateUrl: 'crud-table.component.html',
  imports: [CommonModule, TableModule, IconField, InputIcon, Button, Paginator],
})
export class CrudTableComponent<T extends Identifiable> {

  table = viewChild(Table);

  columns = input<Column<T>[]>([]);
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  templateMap = input<Map<string, TemplateRef<any>>>(new Map());
  actionsTemplate = input<TemplateRef<any>>();
  items = input<Page<T> | undefined>(undefined);

  editClick = output<T>();
  deleteOneClick = output<T>();
  pageChange = output<{ page: number; size: number }>();

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onPage(event: PaginatorState) {
    console.log(event)
    this.pageChange.emit({ page: event.first! / event.rows!, size: event.rows! });
  }

  getValue(row: any, field: string | keyof T) {
    const path = String(field).split('.');
    return path.reduce((acc: any, seg) => (acc ? acc[seg] : null), row);
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
