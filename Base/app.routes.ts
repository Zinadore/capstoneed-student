import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../../shared/Guards/isAuthenticatedGuard';
import { LoginComponent } from './login-component/login.component';
import { HomeComponent } from '../Student/home-component/home.component';
import { PaFeedComponent } from '../Student/assessment/pa-feed-component/pa-feed.component';
import { UnitListComponent } from '../Student/unit/unit-list-component/unit-list.component';
import { ProjectEnrollmentComponent } from '../Student/project/project-enrollment-component/project-enrollment.component';
import { PeerAssessmentComponent } from '../Student/assessment/peer-assessment-component/peer-assessment.component';
import { ProjectDetailsComponent } from '../Student/project/project-details-component/project-details.component';
import { ProjectListComponent } from '../Student/project/project-list-component/project-list.component';
import { LogsComponent } from '../Student/logs/logs-component/logs.component';
import { RegisterComponent } from './register-component/register.component';
import { RegisterSuccessComponent } from './register-success-component/register-success.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'register_success', pathMatch: 'full', component: RegisterSuccessComponent },
  { path: '', canActivate: [IsAuthenticatedGuard], children: [
    { path: 'units', children: [
      { path: '', pathMatch: 'full', component: UnitListComponent }
    ] },
    { path: 'projects', children: [
      { path: 'enroll', component: ProjectEnrollmentComponent},
      { path: ':id', children:[
        { path: '', pathMatch: 'full', component: ProjectDetailsComponent }
      ]},
      { path: '', pathMatch: 'full', component: ProjectListComponent }
    ]},
    { path: 'peer-assessments', children: [
      { path: ':id', component: PeerAssessmentComponent },
      { path: '', pathMatch: 'full', component: PaFeedComponent}
    ]},
    { path: 'logs', component: LogsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
  ]}
];
