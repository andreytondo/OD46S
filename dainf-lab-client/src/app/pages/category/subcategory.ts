import { Identifiable } from "@/shared/crud/crud";

export interface Subcategory extends Identifiable {
    id: number;
    description?: string;
}