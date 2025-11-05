import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { MenuService } from './../../../shared/services/menu.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const menuService = inject(MenuService);
  const router = inject(Router);

  // Normalize route path (e.g. "item" or "admin/settings")
  const currentPath = route.routeConfig?.path ?? '';

  return menuService.getMenu().pipe(
    map(menuItems => {
      const flatMenu = flattenMenu(menuItems.items);

      const allowed = flatMenu.some(item => {
        if (!item.routerLink) return false;
        const link = item.routerLink.replace(/^\//, '');
        return link === currentPath;
      });

      if (allowed) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
  );
};

/**
 * Recursively flattens a nested menu tree.
 */
function flattenMenu(items: any[]): any[] {
  if (!Array.isArray(items)) return [];
  return items.flatMap(item => [
    item,
    ...(item.items ? flattenMenu(item.items) : [])
  ]);
}
