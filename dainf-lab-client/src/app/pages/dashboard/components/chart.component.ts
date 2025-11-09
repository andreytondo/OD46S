import { Component, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  standalone: true,
  selector: 'app-chart',
  imports: [ChartModule],
  template: `
    <div class="card">
      <div class="font-semibold text-xl mb-4">{{ title() }}</div>
      <p-chart
        [type]="type()"
        [data]="chartData()"
        [options]="chartOptions()"
        class="h-100"
      />
    </div>
  `,
})
export class ChartComponent {
  title = input<string>('Chart Title');

  type = input<
    | 'line'
    | 'bar'
    | 'scatter'
    | 'bubble'
    | 'pie'
    | 'doughnut'
    | 'polarArea'
    | 'radar'
  >('bar');

  chartData = input.required<{
    labels: string[];
    datasets: any[];
  }>();

  chartOptions = input.required();
}
