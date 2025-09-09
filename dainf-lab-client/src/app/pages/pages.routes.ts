
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { FornecedorComponent } from './supplier/fornecedor.component';
import { UserComponent } from './user/user.component';

export default [
  {
    path: '',
    children: [
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'fornecedores', component: FornecedorComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
] as Routes;
