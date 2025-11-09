import { Injectable, inject, signal } from '@angular/core';
import { debounceTime, tap } from 'rxjs';
import { LayoutService } from '../../layout/service/layout.service';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private layoutService = inject(LayoutService);

  // Signals to notify components when theme changes
  themeUpdated = signal(0);

  constructor() {
    this.layoutService.configUpdate$
      .pipe(
        debounceTime(25),
        tap(() => this.themeUpdated.update((v) => v + 1)),
      )
      .subscribe();
  }

  private getThemeVars() {
    const docStyle = getComputedStyle(document.documentElement);
    return {
      textColor: docStyle.getPropertyValue('--text-color'),
      textMutedColor: docStyle.getPropertyValue('--text-color-secondary'),
      borderColor: docStyle.getPropertyValue('--surface-border'),
      primary: [
        docStyle.getPropertyValue('--p-primary-200'),
        docStyle.getPropertyValue('--p-primary-300'),
        docStyle.getPropertyValue('--p-primary-400'),
        docStyle.getPropertyValue('--p-primary-500'),
      ],
    };
  }

  getDefaultOptions(overrides?: any) {
    const { textColor, textMutedColor, borderColor } = this.getThemeVars();
    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textMutedColor },
          grid: { color: 'transparent', borderColor: 'transparent' },
        },
        y: {
          ticks: { color: textMutedColor },
          grid: {
            color: borderColor,
            borderColor: 'transparent',
            drawTicks: false,
          },
        },
      },
      ...overrides,
    };
  }

  getBarChart(labels: string[], datasets: any[]) {
    const theme = this.getThemeVars();
    const total = datasets.length;
    return {
      data: {
        labels,
        datasets: datasets.map((d, i) => {
          const isTop = i === total - 1; // only top layer gets rounded corners
          return {
            ...d,
            backgroundColor:
              d.backgroundColor ?? theme.primary[i % theme.primary.length],
            barThickness: d.barThickness ?? 32,
            borderRadius: isTop
              ? { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 }
              : 0,
            borderSkipped: false,
          };
        }),
      },
      options: this.getDefaultOptions({
        scales: { x: { stacked: true }, y: { stacked: true } },
      }),
    };
  }

  getLineChart(labels: string[], datasets: any[]) {
    const theme = this.getThemeVars();
    return {
      data: {
        labels,
        datasets: datasets.map((d, i) => ({
          ...d,
          borderColor:
            d.borderColor ??
            theme.primary[
              (theme.primary.length - 1 - i) % theme.primary.length
            ],
          backgroundColor:
            d.backgroundColor ??
            theme.primary[
              (theme.primary.length - 1 - i) % theme.primary.length
            ],
          fill: d.fill ?? false,
          tension: d.tension ?? 0.4,
        })),
      },
      options: this.getDefaultOptions({
        scales: { y: { beginAtZero: true } },
      }),
    };
  }

  getPieChart(
    labels: string[],
    data: number[],
    type: 'pie' | 'doughnut' = 'pie',
  ) {
    const theme = this.getThemeVars();
    return {
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: theme.primary,
          },
        ],
      },
      options: this.getDefaultOptions({
        cutout: type === 'doughnut' ? '60%' : undefined,
      }),
    };
  }
}
