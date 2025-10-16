import { Identifiable } from '@/shared/crud/crud';
import { Item } from '../item/item';
import { User } from '../user/user';
import { Loan } from '../loan/loan';

export interface IssueItem extends Identifiable {
  quantity: number;
  item: Item;
}

export interface Issue extends Identifiable {
  date: Date;
  user: User;
  items: IssueItem[];
  observation?: string;
  loan?: Loan;
}