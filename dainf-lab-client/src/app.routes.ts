import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { NotfoundComponent } from '@/pages/not-found/not-found.component';
import { DashboardComponent } from '@/pages/dashboard/dashboard.component';
import { AuthGuard } from '@/pages/auth/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    ]
  },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
