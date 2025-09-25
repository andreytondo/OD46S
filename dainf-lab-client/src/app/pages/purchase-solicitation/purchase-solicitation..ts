import { Identifiable } from '@/shared/crud/crud';
import { Item } from '../item/item';
import { Fornecedor } from '../supplier/fornecedor';
import { User } from '../user/user';

export interface PurchaseSolicitationItem extends Identifiable {
  item: Item;
  quantity: number;
}

export interface PurchaseSolicitation extends Identifiable {
  description: string;
  observation: string;
  user: User;
  date: string;
  fornecedor: Fornecedor;
  items: PurchaseSolicitationItem[];
}
