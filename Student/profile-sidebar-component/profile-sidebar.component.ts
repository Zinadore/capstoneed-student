import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../shared/Directives/componentBase';
import { User } from '../../../shared/Store/Models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/Store/Reducers/index';
import { isNullOrUndefined } from 'util';
import { Project } from '../../../shared/Store/Models/project';
import { AuthenticationService } from '../../../shared/Services/authentication.service';

@Component({
  selector: 'ced-profile-sidebar',
  templateUrl: 'profile-sidebar.component.html',
  styleUrls: ['profile-sidebar.component.scss']
})
export class ProfileSidebarComponent extends ComponentBase implements OnInit {

  private user: Observable<User>;
  private projects: Observable<Project[]>;

  constructor(store: Store<IAppState>, private authService: AuthenticationService) {
    super();
    this.user = store.select(state => state.user);
    this.projects = store.select(state => state.projects)
  }

  ngOnInit() {
  }

  onLogout(): void {
    this.authService.logout();
  }

}
