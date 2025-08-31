export interface Column<T = any> {
  field: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  cellTemplateName?: string;
  exportHeader?: string;
}

export interface CrudConfig<T = any> {
  title?: string;
}
