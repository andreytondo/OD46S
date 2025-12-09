
import { Routes } from '@angular/router';
import { RoleGuard } from './auth/guards/role.guard';
import { CategoryComponent } from './category/category.component';
import { ConfigurationComponent } from './config/config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueComponent } from './issue/issue.component';
import { ItemComponent } from './item/item.component';
import { LoanComponent } from './loan/loan.component';
import { PurchaseSolicitationComponent } from './purchase-solicitation/purchase-solicitation.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FornecedorComponent } from './supplier/fornecedor.component';
import { UserComponent } from './user/user.component';
import { ItemWrapperComponent } from './item/item-wrapper.component';

export default [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard] },
      { path: 'category', component: CategoryComponent, canActivate: [RoleGuard] },
      { path: 'supplier', component: FornecedorComponent, canActivate: [RoleGuard] },
      { path: 'user', component: UserComponent, canActivate: [RoleGuard] },
      { path: 'item', component: ItemWrapperComponent, canActivate: [RoleGuard] },
      { path: 'purchase', component: PurchaseComponent, canActivate: [RoleGuard] },
      { path: 'loan', component: LoanComponent, canActivate: [RoleGuard] },
      { path: 'issue', component: IssueComponent, canActivate: [RoleGuard] },
      { path: 'reservation', component: ReservationComponent, canActivate: [RoleGuard] },
      { path: 'purchase-solicitation', component: PurchaseSolicitationComponent, canActivate: [RoleGuard] },
      { path: 'configuration', component: ConfigurationComponent, canActivate: [RoleGuard] },
    ]
  },
] as Routes;
