
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { FornecedorComponent } from './supplier/fornecedor.component';
import { UserComponent } from './user/user.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LoanComponent } from './loan/loan.component';

export default [
  {
    path: '',
    children: [
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'fornecedores', component: FornecedorComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'item', component: ItemComponent, canActivate: [AuthGuard] },
      { path: 'compra', component: PurchaseComponent, canActivate: [AuthGuard] },
      { path: 'loan', component: LoanComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
] as Routes;
