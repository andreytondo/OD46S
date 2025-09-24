import { Identifiable } from "@/shared/crud/crud";
import { Item } from "../item/item";

export interface Loan extends Identifiable {
  id: number;
  borrower: string;
  loanDate: string;
  deadline: string;
  devolutionDate: string;
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

export type LoanStatus = 'PENDENTE' | 'ATRASADO' | 'DEVOLVIDO';