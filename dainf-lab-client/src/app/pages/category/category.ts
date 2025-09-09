import { Subcategory } from "@/pages/category/subcategory";
import { Identifiable } from "@/shared/crud/crud";

export interface Category extends Identifiable {
    id: number;
    description?: string;
    icon?: string;
    subcategories?: Subcategory[];
}
