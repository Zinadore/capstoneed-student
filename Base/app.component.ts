import '../../style/app.scss';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/Services/authentication.service';
import { UserType } from '../../shared/Store/Models/user';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'ced-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private _rightOpen: boolean;
  private _leftOpen: boolean;

  constructor(private authService: AuthenticationService, private breadcrumbService: BreadcrumbService) {
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
