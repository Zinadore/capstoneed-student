import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../shared/Directives/componentBase';
import { User } from '../../../shared/Store/Models/user';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/Store/Reducers/index';

@Component({
  selector: 'ced-profile-details',
  templateUrl: 'profile-details.component.html',
  styleUrls: ['profile-details.component.scss']
})
export class ProfileDetailsComponent extends ComponentBase implements OnInit {

  private user: User;

  constructor(store: Store<IAppState>) {
    super();
    this.disposeOnDestroy(store.select((state: IAppState) => state.user).subscribe(value => {
      this.user = value;
    }));
  }

  ngOnInit() {
  }


}
