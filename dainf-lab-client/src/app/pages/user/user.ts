import { Identifiable } from "@/shared/crud/crud";

export interface User extends Identifiable {
  id: number;
  email?: string;
  password?: string;
  nome?: string;
  telefone?: string;
  documento?: string;
  roles?: string[];
}
