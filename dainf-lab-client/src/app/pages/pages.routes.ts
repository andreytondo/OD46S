
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { AppLayout } from '@/layout/component/app.layout';
import { DashboardComponent } from './dashboard/dashboard.component';

export default [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/not-found' }
    ]
  },
] as Routes;
