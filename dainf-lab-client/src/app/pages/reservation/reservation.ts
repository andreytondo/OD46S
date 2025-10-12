import { Identifiable } from '@/shared/crud/crud';
import { User } from '../user/user';
import { Item } from '../item/item'; 

export interface ReservationItem extends Identifiable {
  item: Item; 
  quantity: number;
  price?: number; 
}

export interface Reservation extends Identifiable {
  description?: string;
  observation?: string;
  reservationDate: Date;
  withdrawalDate?: Date;
  user: User;
  items: ReservationItem[];
}