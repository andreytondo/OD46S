
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { CategoryComponent } from './category/category.component';
import { IssueComponent } from './issue/issue.component';
import { ItemComponent } from './item/item.component';
import { LoanComponent } from './loan/loan.component';
import { PurchaseSolicitationComponent } from './purchase-solicitation/purchase-solicitation.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FornecedorComponent } from './supplier/fornecedor.component';
import { UserComponent } from './user/user.component';

export default [
  {
    path: '',
    children: [
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'supplier', component: FornecedorComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'item', component: ItemComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'loan', component: LoanComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'issue', component: IssueComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'purchase-solicitation', component: PurchaseSolicitationComponent, canActivate: [AuthGuard, RoleGuard] },
    ]
  },
] as Routes;
