import { BaseService } from '@/shared/services/base.service';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  private datePipe = new DatePipe('en-US');

  getDashboardData(start: Date, end: Date): Observable<any> {
    const params: Record<string, string> = {
      start: this.datePipe.transform(start, 'yyyy-MM-dd') || '',
      end: this.datePipe.transform(end, 'yyyy-MM-dd') || '',
    };

    return this._http.get(`${this.apiUrl}/dashboard`, { params });
  }

  mapLoanCountByDays(loanCount: any) {
    return {
      labels: loanCount.map((d: any) => d.day),
      datasets: [
        {
          label: 'Total',
          data: loanCount.map((d: any) => d.total),
        },
      ],
    };
  }

  mapStats(summary: any): any[] {
    return [
      {
        label: 'Empréstimos em andamento',
        value: summary.ongoingCount,
        iconClass: 'pi-clock',
        iconBgClass: 'bg-yellow-100 dark:bg-yellow-400/10 text-yellow-500',
      },
      {
        label: 'Empréstimos em atraso',
        value: summary.overdueCount,
        iconClass: 'pi-exclamation-triangle',
        iconBgClass: 'bg-red-100 dark:bg-red-400/10 text-red-500',
      },
      {
        label: 'Empréstimos concluídos',
        value: summary.completedCount,
        iconClass: 'pi-check-circle',
        iconBgClass: 'bg-green-100 dark:bg-green-400/10 text-green-500',
      },
      {
        label: 'Total de empréstimos',
        value: summary.totalCount,
        subLabel: 'Número total de',
        subText: 'empréstimos no sistema',
        iconClass: 'pi-briefcase',
        iconBgClass: 'bg-blue-100 dark:bg-blue-400/10 text-blue-500',
      },
    ];
  }
}
