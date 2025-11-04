export interface Column<T extends Identifiable> {
  field: keyof T | string;
  header: string;
  width?: string;
  transform?: (row: T) => string;
}

export interface CrudConfig<T extends Identifiable> {
  title?: string;
  allowDeletion?: boolean;
  allowUpdate?: boolean;
}

export interface Identifiable<T = number> {
  id: T;
}
