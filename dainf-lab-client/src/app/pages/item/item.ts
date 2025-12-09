import { Identifiable } from '@/shared/crud/crud';
import { Category } from '../category/category';

export interface Item extends Identifiable {
  name: string;
  description: string;
  price: number;
  category: Category;
  assets: Asset[];
  siorg: string;
  quantity: number;
  minimumStock: number;
  type: ItemType;
  images: any
}

export interface Asset extends Identifiable {
  id: number;
  location: string;
  serialNumber: string;
  status: AssetStatus;
}

export type ItemType = 'CONSUMABLE' | 'DURABLE';
export type AssetStatus = 'AVAILABLE' | 'LOANED' | 'RESERVED' | 'UNDER_MAINTENANCE'
