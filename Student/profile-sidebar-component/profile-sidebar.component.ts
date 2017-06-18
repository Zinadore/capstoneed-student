import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../shared/Directives/componentBase';
import { User, XP } from '../../../shared/Store/Models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/Store/Reducers/index';
import { AuthenticationService } from '../../../shared/Services/authentication.service';

@Component({
  selector: 'ced-profile-sidebar',
  templateUrl: 'profile-sidebar.component.html',
  styleUrls: ['profile-sidebar.component.scss']
})
export class ProfileSidebarComponent extends ComponentBase implements OnInit {

  private user: Observable<User>;

  constructor(store: Store<IAppState>, private authService: AuthenticationService) {
    super();
    this.user = store.select(state => state.user);
  }

  ngOnInit() {
  }

  onLogout(): void {
    this.authService.logout();
  }

  getProgressValue(xp: XP): number {
    if (xp.level >= 7) return 100;

    let min = (xp.level * xp.level) / 0.02;
    let max = xp.total_xp + xp.xp_to_next_level;

    return Math.round((xp.total_xp - min) / (max - min) * 100);
  }

}
