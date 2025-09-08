export interface SearchRequest {
  filters?: SearchFilter[];
  sort?: SearchSort;
  page: number;
  rows: number;
}

export interface SearchFilter {
  field: string;
  value: any; // pode ser string, number, boolean, array...
  type: SearchFilterType;
}

export type SearchFilterType =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'LIKE'
  | 'NOT_LIKE'
  | 'GREATER'
  | 'LESS'
  | 'GREATER_EQUALS'
  | 'LESS_EQUALS'
  | 'IN'
  | 'NOT_IN'
  | 'IS_NULL'
  | 'IS_NOT_NULL'
  | 'BETWEEN';

export interface SearchSort {
  field: string;
  type: SearchSortType;
}

export type SearchSortType = 'ASC' | 'DESC';

export interface Page<T> {
  content: T[];

  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
