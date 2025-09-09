import { Identifiable } from "@/shared/crud/crud";
import { UnidadeFederativa } from "@/shared/models/unidade-federativa";

export interface Cidade extends Identifiable {
  nome: string;
  estado: UnidadeFederativa;
}
