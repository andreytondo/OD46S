export interface Column<T extends Identifiable> {
  field: keyof T | string;
  header: string;
  width?: string;
  cellTemplateName?: string;
}

export interface CrudConfig<T extends Identifiable> {
  title?: string;
}

export interface Identifiable<T = number> {
  id: T;
}
