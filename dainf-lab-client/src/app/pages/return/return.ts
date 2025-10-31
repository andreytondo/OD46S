import { Identifiable } from "@/shared/crud/crud";
import { Item } from "../item/item";
import { Loan } from "../loan/loan";

export interface Return extends Identifiable {
  loan: Loan;
  returnDate: string;
  observation?: string;
  items?: ReturnItem[];
}

export interface ReturnItem extends Identifiable {
  item: Item;
  quantityReturned: number;
  quantityIssued: number;
}
