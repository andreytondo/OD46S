import { Identifiable } from "@/shared/crud/crud";
import { Subcategory } from "@/pages/category/subcategory";

export interface Category extends Identifiable {
    id: number;
    description?: string;
    icon?: string;
    subcategories?: Subcategory[];
}