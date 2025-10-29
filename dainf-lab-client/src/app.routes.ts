import { AuthGuard } from '@/pages/auth/guards/auth.guard';
import { NotfoundComponent } from '@/pages/not-found/not-found.component';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./app/pages/pages.routes') },
    ]
  },
  { path: '', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
