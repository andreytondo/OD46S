export interface Column<T = any> {
  field: keyof T | string;
  header: string;
  width?: string;
  cellTemplateName?: string;
}

export interface CrudConfig<T = any> {
  title?: string;
}
