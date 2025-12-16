import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, take, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { ChartService } from './../../shared/services/chart.service';
import { ChartComponent } from './components/chart.component';
import { LowStockPanelComponent } from './components/low-stock-panel.component';
import { RecentOperationsComponent } from './components/recent-operations.component';
import { StatSkeletonComponent } from './components/stat-skeleton.component';
import { Stat } from './components/stat.component';
import {
  DashboardService,
  InventoryOperation,
  LowStockItem,
} from './dashboard.service';

const DATE_RANGE_STORAGE_KEY = 'dashboardDateRange';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    ButtonModule,
    Stat,
    DatePicker,
    FormsModule,
    ReactiveFormsModule,
    StatSkeletonComponent,
    ChartComponent,
    LowStockPanelComponent,
    RecentOperationsComponent,
  ],
  template: `
    <div class="p-6 flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <p-datepicker
          selectionMode="range"
          dateFormat="dd/mm/yy"
          placeholder="Selecione o período"
          showIcon
          required
          [(ngModel)]="dateRange"
        ></p-datepicker>
        <button
          pButton
          label="Filtrar"
          icon="pi pi-search"
          (click)="loadDashboard()"
        ></button>
        <button
          pButton
          label="Últimos 30 dias"
          icon="pi pi-undo"
          styleClass="p-button-secondary"
          (click)="resetDateRange()"
        ></button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        @if (loading()) {
          @for (i of skeletonCount; track $index) {
            <app-stat-skeleton />
          }
        } @else {
          @for (item of stats(); track $index) {
            <app-stat
              [label]="item.label"
              [value]="item.value"
              [subLabel]="item.subLabel"
              [subText]="item.subText"
              [iconBgClass]="item.iconBgClass"
              [iconClass]="item.iconClass"
            />
          }
        }
      </div>

      @if (hasAdvancedPrivileges()) {
        @if (loading() || !loansByDay()) {
          <!-- skeleton -->
        } @else {
          <app-chart
            type="line"
            [chartData]="loansByDay()!.data"
            [chartOptions]="loansByDay()!.options"
            [title]="loansByDay()!.title"
          />
        }

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <app-low-stock-panel
            class="xl:col-span-2"
            [items]="lowStockItems()"
            [loading]="loading()"
          />
          <app-recent-operations
            [operations]="recentOperations()"
            [loading]="loading()"
          />
        </div>
      }
    </div>
  `,
  providers: [UserService],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private chartService = inject(ChartService);
  private userService = inject(UserService);

  dateRange = model<Date[]>([]);
  stats = signal<any[]>([]);
  lowStockItems = signal<LowStockItem[]>([]);
  recentOperations = signal<InventoryOperation[]>([]);
  loansByDay = signal<
    | {
        data: { labels: string[]; datasets: any[] };
        options: any;
        title: string;
      }
    | undefined
  >(undefined);
  loading = signal<boolean>(true);
  hasAdvancedPrivileges = toSignal(this.userService.hasAdvancedPrivileges(), {
    initialValue: false,
  });

  skeletonCount = Array(4).fill(0);

  private getDefaultDateRange(): Date[] {
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = new Date(end);
    start.setDate(end.getDate() - 30);
    return [start, end];
  }

  ngOnInit(): void {
    const savedRange = localStorage.getItem(DATE_RANGE_STORAGE_KEY);
    if (savedRange) {
      try {
        const parsedRange: [string, string] = JSON.parse(savedRange);
        const dates = parsedRange.map((d) => new Date(d));

        if (
          dates.length === 2 &&
          dates.every((date) => !isNaN(date.getTime()))
        ) {
          this.dateRange.set(dates);
          return;
        }
      } catch (e) {
        console.error('Erro ao carregar filtro de data do localStorage:', e);
      }
    }
    this.dateRange.set(this.getDefaultDateRange());
  }

  constructor() {
    effect(() => {
      if (!this.hasValidDateRange()) return;
      this.saveDateRange();
      this.chartService.themeUpdated();
      this.loadDashboard();
    });
  }

  private hasValidDateRange(): boolean {
    const range = this.dateRange();
    return (
      Array.isArray(range) &&
      range.length === 2 &&
      range.every((date) => date instanceof Date && !isNaN(date.getTime()))
    );
  }

  private normalizeDateRange(range: Date[]): [Date, Date] {
    const [start, end] = range;
    const normalizedStart = new Date(start);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(end);
    normalizedEnd.setHours(23, 59, 59, 999);
    return [normalizedStart, normalizedEnd];
  }

  saveDateRange(): void {
    const rangeAsString = JSON.stringify(
      this.dateRange().map((d) => d.toISOString()),
    );
    localStorage.setItem(DATE_RANGE_STORAGE_KEY, rangeAsString);
  }

  resetDateRange(): void {
    this.dateRange.set(this.getDefaultDateRange());
  }

  loadDashboard() {
    if (!this.hasValidDateRange()) return;

    const [start, end] = this.normalizeDateRange(this.dateRange());
    this.loading.set(true);
    this.dashboardService
      .getDashboardData(start, end)
      .pipe(
        tap((data) => {
          this._mapStats(data);
          this._mapLoansByDay(data);
          this._mapLowStockItems(data);
          this._mapRecentOperations(data);
        }),
        take(1),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        error: (error) => console.error('Erro ao carregar dashboard:', error),
      });
  }

  private _mapStats(data: any) {
    this.stats.set(this.dashboardService.mapStats(data.loanSummary));
  }

  private _mapLoansByDay(data: any) {
    const loanCountByDays = this.dashboardService.mapLoanCountByDays(
      data.loanCountByDays,
    );
    const { data: chartData, options: chartOptions } =
      this.chartService.getLineChart(
        loanCountByDays.labels,
        loanCountByDays.datasets,
      );
    this.loansByDay.set({
      data: chartData,
      options: chartOptions,
      title: 'Empréstimos por dia',
    });
  }

  private _mapLowStockItems(data: any) {
    this.lowStockItems.set(
      this.dashboardService.mapLowStockItems(data.lowStockItems),
    );
  }

  private _mapRecentOperations(data: any) {
    this.recentOperations.set(
      this.dashboardService.mapRecentOperations(data.recentOperations),
    );
  }
}
