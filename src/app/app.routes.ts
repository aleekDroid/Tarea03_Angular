import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GroupComponent } from './pages/group/group.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManagePermissionsComponent } from './pages/manage-permissions/manage-permissions.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'group', component: GroupComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },

      {
        path: 'group-view/:id',
        loadComponent: () => import('./pages/group-view/group-view.component')
          .then(m => m.GroupViewComponent)
      },

      {
        path: 'group-users/:id',
        loadComponent: () => import('./pages/group-users/group-users.component')
          .then(m => m.GroupUsersComponent)
      },

      {
        path: 'manage-permissions',
        component: ManagePermissionsComponent
      }

    ]
  },
  { path: '**', redirectTo: '' }
];
