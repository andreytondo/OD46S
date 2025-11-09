import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {
  catchError,
  debounceTime,
  finalize,
  Observable,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Page, SearchRequest } from '../models/search';
import { Column, CrudConfig, Identifiable } from './crud';
import { CrudService } from './crud.service';
import { CrudDialogComponent } from './dialog/crud-dialog.component';
import { CrudTableComponent } from './table/crud-table.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    CrudTableComponent,
    CrudDialogComponent,
    ToastModule,
    DrawerModule,
  ],
  selector: 'app-crud',
  templateUrl: 'crud.component.html',
})
export class CrudComponent<T extends Identifiable> implements OnInit {
  table = viewChild(CrudTableComponent);

  service = input.required<CrudService<T>>();
  columns = input<Column<T>[]>([]);
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  form = input<FormGroup>();
  searchRequest = input<SearchRequest>();
  templateMap = input<Map<keyof T | string, TemplateRef<any>> | undefined>(
    new Map(),
  );
  filtersTemplate = input<TemplateRef<any> | undefined>(undefined);

  actionsTemplate = input<TemplateRef<any>>();
  formTemplate = input<TemplateRef<any>>();

  cancelClick = output<void>();
  saveClick = output<void>();
  entityLoad = output<T>();

  items = signal<Page<T> | undefined>(undefined);
  dialogVisible = signal<boolean>(false);
  loadingItems = signal<boolean>(false);
  loadingEntity = signal<boolean>(false);

  drawerVisible = model<boolean>(false);

  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  lastPagination: { page: number; rows: number } | undefined;

  searchRequestChange$ = toObservable(this.searchRequest)
    .pipe(
      debounceTime(600),
      tap(() => this.loadItems()),
      takeUntilDestroyed(),
    )
    .subscribe();

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(page?: number, rows?: number) {
    this.loadingItems.set(true);
    this.lastPagination = { page: page ?? 0, rows: rows ?? 10 };
    const request = { ...this.searchRequest(), page, rows };
    this._loadItems(request)
      .pipe(
        tap((result) => {
          this.items.set(result);
        }),
        finalize(() => this.loadingItems.set(false)),
      )
      .subscribe();
  }

  onPage(event: { page: number; size: number }) {
    this.loadItems(event.page, event.size);
  }

  openNew() {
    this.dialogVisible.set(true);
  }

  export() {
    this.table()?.export();
  }

  save() {
    if (this.form()?.invalid) {
      this.form()!.markAllAsTouched();
      this.form()!.markAllAsDirty();
      return;
    }

    const item: T = this.form()?.getRawValue();
    this._save(item)
      ?.pipe(
        tap(() => {
          this.cancel();
          this.loadItems(this.lastPagination?.page, this.lastPagination?.rows);
          this.saveClick.emit();
          this._showSuccess('Registro salvo com sucesso.');
        }),
        catchError((error) => {
          this._showWarn(this._extractErrorMessage(error));
          return throwError(() => error);
        }),
        take(1),
      )
      .subscribe();
  }

  edit(item: T) {
    this.service()
      .get(item.id)
      .pipe(
        tap((item: T) => {
          this.form()?.patchValue(item as { [key: string]: any });
          this.entityLoad.emit(item);
          this.dialogVisible.set(true);
        }),
        take(1),
      )
      .subscribe();
  }

  deleteOne(item: T) {
    this.confirmationService.confirm({
      header: 'Atenção!',
      message: 'Deseja realmente excluir este registro?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => this._delete(item),
    });
  }

  cancel() {
    this.dialogVisible.set(false);
    this.form()?.reset();
    this.cancelClick.emit();
  }

  private _delete(item: T) {
    this.service()
      .delete(item.id)
      .pipe(
        tap(() =>
          this.loadItems(this.lastPagination?.page, this.lastPagination?.rows),
        ),
        catchError((error) => {
          this._showWarn(`Falha ao deletar o registro: ${error.error.message}`);
          return throwError(() => error);
        }),
        take(1),
      )
      .subscribe();
    this.cancel();
  }

  private _extractErrorMessage(error: any): string {
    if (!!error?.error?.errors) {
      return Object.entries(error.error.errors)
        .map(([field, message]) => `${message}`)
        .join(', ');
    }

    return error?.error?.message || 'Informações inválidas';
  }

  private _showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção!',
      detail: detail,
    });
  }

  private _showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: detail,
    });
  }

  private _save(item: T): Observable<any> {
    const isUpdate = !!item.id;
    return isUpdate
      ? this.service().update(item.id, item)
      : this.service().create(item);
  }

  private _loadItems(request?: SearchRequest): Observable<Page<T>> {
    const req = this._mapRequest(request);
    return this.service().search(req);
  }

  private _mapRequest(request?: SearchRequest): SearchRequest {
    const base = this.baseRequest;
    return {
      filters: request?.filters ?? base.filters,
      sort: request?.sort ?? base.sort,
      page: request?.page ?? base.page,
      rows: request?.rows ?? base.rows,
    };
  }

  private get baseRequest() {
    return {
      filters: [],
      sort: { field: 'id', type: 'ASC' as const },
      page: 0,
      rows: 10,
    };
  }
}
