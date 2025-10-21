import { Identifiable } from '@/shared/crud/crud';
import { Item } from '../item/item';
import { User } from '../user/user';

export interface Loan extends Identifiable {
  id: number;
  borrower: User;
  loanDate: string;
  deadline: string;
  observation: string;
  raSiape: string;
  items: Item[];
}

export interface LoanItem extends Identifiable {
  id: number;
  loan: Loan;
  item: Item;
  shouldReturn: boolean;
  quantity: number;
  status: LoanStatus;
}

export interface LoanItemTracking extends Identifiable {
  loanItemId: number;
  quantity: number;
  status: string;

  loanId?: number;
  raSiape?: string;
  observation?: string;
  loanDate?: string | Date;
  deadline?: string | Date;

  borrowerId?: number;
  borrowerName?: string;
  borrowerEmail?: string;
}

export type LoanStatus = 'PENDENTE' | 'ATRASADO' | 'DEVOLVIDO';
