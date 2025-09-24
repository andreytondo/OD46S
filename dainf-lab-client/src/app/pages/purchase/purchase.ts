import { Identifiable } from '@/shared/crud/crud';
import { Item } from '../item/item';
import { Fornecedor } from '../supplier/fornecedor';
import { User } from '../user/user';

export interface PurchaseItem extends Identifiable {
  item: Item;
  quantity: number;
  price: number;
}

export interface Purchase extends Identifiable {
  user: User;
  date: Date;
  fornecedor: Fornecedor;
  items: PurchaseItem[];
  totalValue?: number;
}
