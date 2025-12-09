import { BaseService } from '@/shared/services/base.service';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type InventoryOperationType = 'PURCHASE' | 'ISSUE' | 'RETURN' | 'LOAN';

export interface LowStockItem {
  itemId: number;
  name: string;
  quantity: number;
  minimumStock: number;
  category?: string;
  percentage: number;
}

export interface InventoryOperation {
  id: number;
  itemName: string;
  type: InventoryOperationType;
  quantity: number;
  date: Date;
  userName: string;
  label: string;
  severity: 'success' | 'warn' | 'danger' | 'info' | null;
  iconClass: string;
}

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

  mapLowStockItems(items: any[]): LowStockItem[] {
    return (items ?? []).map((item: any) => {
      const quantity = Number(item.quantity ?? 0);
      const minimum = Number(item.minimumStock ?? 0);
      const percentage = minimum > 0 ? Math.min((quantity / minimum) * 100, 100) : 0;

      return {
        itemId: item.itemId,
        name: item.name,
        quantity,
        minimumStock: minimum,
        category: item.category,
        percentage,
      };
    });
  }

  mapRecentOperations(ops: any[]): InventoryOperation[] {
    return (ops ?? []).map((op: any) => {
      const type = (op.type ?? '').toString() as InventoryOperationType;
      const quantity = Number(op.quantity ?? 0);

      return {
        id: op.id,
        itemName: op.itemName,
        type,
        quantity,
        date: new Date(op.date),
        userName: op.userName || 'Sistema',
        label: this.getOperationLabel(type),
        severity: this.getOperationSeverity(type),
        iconClass: this.getOperationIcon(type),
      };
    });
  }

  private getOperationLabel(type: InventoryOperationType): string {
    switch (type) {
      case 'PURCHASE':
        return 'Compra';
      case 'ISSUE':
        return 'Saída';
      case 'RETURN':
        return 'Devolução';
      case 'LOAN':
        return 'Empréstimo';
      default:
        return 'Movimentação';
    }
  }

  private getOperationSeverity(type: InventoryOperationType): InventoryOperation['severity'] {
    switch (type) {
      case 'PURCHASE':
        return 'success';
      case 'RETURN':
        return 'info';
      case 'ISSUE':
        return 'warn';
      case 'LOAN':
        return 'danger';
      default:
        return null;
    }
  }

  private getOperationIcon(type: InventoryOperationType): string {
    switch (type) {
      case 'PURCHASE':
        return 'pi-shopping-cart';
      case 'RETURN':
        return 'pi-refresh';
      case 'ISSUE':
        return 'pi-sign-out';
      case 'LOAN':
        return 'pi-send';
      default:
        return 'pi-box';
    }
  }
}
