import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../../shared/Guards/isAuthenticatedGuard';
import { LoginComponent } from './login-component/login.component';
import { HomeComponent } from '../Student/home-component/home.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [IsAuthenticatedGuard], children: [

    { path: '', pathMatch: 'full', redirectTo: 'home' }
  ]}
];
