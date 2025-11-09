import { CommonModule } from '@angular/common';
import { Component, effect, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { take, tap } from 'rxjs';
import { ChartService } from './../../shared/services/chart.service';
import { ChartComponent } from './components/chart.component';
import { StatSkeletonComponent } from './components/stat-skeleton.component';
import { Stat } from './components/stat.component';
import { DashboardService } from './dashboard.service';

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
    </div>
  `,
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  private chartService = inject(ChartService);

  dateRange = model<Date[]>([
    new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  stats = signal<any[]>([]);
  loansByDay = signal<
    | {
        data: { labels: string[]; datasets: any[] };
        options: any;
        title: string;
      }
    | undefined
  >(undefined);
  loading = signal<boolean>(true);

  skeletonCount = Array(4).fill(0);

  constructor() {
    effect(() => {
      if (this.dateRange().filter(Boolean).length !== 2) return;
      this.chartService.themeUpdated(); // re-run on theme update
      this.loadDashboard();
    });
  }

  loadDashboard() {
    this.loading.set(true);
    const [start, end] = this.dateRange() || [];
    this.dashboardService
      .getDashboardData(start, end)
      .pipe(
        tap((data) => {
          this._mapStats(data);
          this._mapLoansByDay(data);
          this.loading.set(false);
        }),
        take(1),
      )
      .subscribe();
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
}
