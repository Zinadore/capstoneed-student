import '../../style/app.scss';

import { Component, OnInit } from '@angular/core';
import { CustomHttp } from '../../shared/Services/customHttp';
import { AuthenticationService } from '../../shared/Services/authentication.service';
import { UserType, User } from '../../shared/Store/Models/user';
import { Observable } from 'rxjs';
import { IAppState } from '../../shared/Store/Reducers/index';
import { Store } from '@ngrx/store';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'ced-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private _rightOpen: boolean;
  private _leftOpen: boolean;

  constructor(private authService: AuthenticationService, store: Store<IAppState>) {
    this._rightOpen = this._leftOpen = false;
  }

  toggleRight(): void {
    this._rightOpen = !this._rightOpen;
  }

  toggleLeft(): void {
    this._leftOpen = !this._leftOpen;
  }

  ngOnInit(): void {
    this.authService.userType = UserType.STUDENT;
    this.authService.getMe();
  }
}
