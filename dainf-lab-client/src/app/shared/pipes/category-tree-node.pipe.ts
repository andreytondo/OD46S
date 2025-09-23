import { Category } from '@/pages/category/category';
import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Pipe({
  name: 'categoryTreeNode',
})
export class CategoryTreeNodePipe implements PipeTransform {
  transform(categories: Category[] | Category): TreeNode<Category>[] {
    if (Array.isArray(categories)) {
      return categories.map((category) => this._map(category));
    }
    return [this._map(categories)];
  }

  private _map(category: Category): TreeNode<Category> {
    const children = category.subcategories?.length
      ? this.transform(category.subcategories) // always returns array
      : [];

    return {
      key: category.id.toString(),
      label: category.description,
      icon: category.icon,
      data: category,
      children,
      leaf: children.length === 0,
    };
  }
}
