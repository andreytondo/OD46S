  import { Identifiable } from '@/shared/crud/crud';
  import { Item } from '@/pages/item/item';
  import { User } from '@/pages/user/user';

  export interface CartItem extends Identifiable {
    quantity: number;
    item: Item;
  }

  export interface Cart extends Identifiable {
    user: User;
    items: CartItem[];
  }