import { NgModule, ApplicationRef } from '@angular/core';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header-component/header.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login-component/login.component';
import { ServicesModule } from '../../shared/Services/services.module';
import { SharedDirectivesModule } from '../../shared/Directives/sharedDirectivesModule';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule, ToastrConfig } from 'ngx-toastr';
import { CedStoreModule } from '../../shared/Store/cedStore.module';
import { GuardsModule } from '../../shared/Guards/guards.module';
import { StudentModule } from '../Student/student.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register-component/register.component';
import { ValidatorsModule } from "ng2-validators";
import { RegisterSuccessComponent } from './register-success-component/register-success.component';

const ToastrGlobalConf: ToastrConfig = <ToastrConfig>{
  maxOpened: 0, // max toasts opened. Toasts will be queued
  autoDismiss: false, // dismiss current toast when max is reached
  iconClasses: { // classes used on toastr service methods
    error: 'toast-error',
    info: 'toast-info',
    success: 'toast-success',
    warning: 'toast-warning',
  },
  newestOnTop: true, // new toast placement
  preventDuplicates: false, // block duplicate messages
  // toastComponent = Toast, // the angular 2 component that will be used
  closeButton: true, // show close button
  timeOut: 1500, // time to live
  enableHtml: false, // allow html in message. (UNSAFE)
  extendedTimeOut: 10000, // time to close after a user hovers over toast
  progressBar: true, // show progress bar
  toastClass: 'toast', // class on toast
  positionClass: 'toast-top-left', // class on toast
  titleClass: 'toast-title', // class inside toast on title
  messageClass: 'toast-message', // class inside toast on message
  tapToDismiss: true, // close on click
  onActivateTick: false, // fire a ApplicationRef.tick() from the toast component when activated. Might help show the toast if you are firing it from a websocket
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(ToastrGlobalConf),
    ToastContainerModule.forRoot(),
    // Ng2BreadcrumbModule.forRoot(),
    CedStoreModule.provideStore(),
    ServicesModule.forRoot(),
    SharedDirectivesModule,
    GuardsModule,
    StudentModule,
    ValidatorsModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
