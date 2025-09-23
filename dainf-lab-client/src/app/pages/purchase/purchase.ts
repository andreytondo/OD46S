import { Identifiable } from "@/shared/crud/crud";
import { Fornecedor } from "../supplier/fornecedor";
import { User } from "../user/user";
import { Item } from "../item/item";

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