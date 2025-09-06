import { Identifiable } from "@/shared/crud/crud";

export interface Category extends Identifiable {
    id: number;
    descricao?: string;
    icone?: string;
    subcategorias?: Category[];
}