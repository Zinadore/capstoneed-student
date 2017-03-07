import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav-component/sidenav.component';
import { HomeComponent } from './home-component/home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '../../shared/Directives/sharedDirectivesModule';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedDirectivesModule
  ],
  declarations: [
    SidenavComponent,
    HomeComponent
  ],
  providers: [],
  exports: [
    SidenavComponent,
    HomeComponent
  ]
})
export class StudentModule {

}
