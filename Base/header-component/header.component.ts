import { Component, Output, EventEmitter, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../../shared/Store/Models/user';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/Store/Reducers/index';
import { ComponentBase } from '../../../shared/Directives/componentBase';

@Component({
  selector: 'ced-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  host: {
    class: 'navbar navbar-light'
  }
})
export class HeaderComponent extends ComponentBase implements OnInit {

  @Output('burgerClicked') _burgerClicked: EventEmitter<boolean>;
  @Output('profileClicked') _profileClicked: EventEmitter<boolean>;
  @HostBinding('class.with-logo') isLogoVisible: boolean;

  private user: User;


  constructor(store: Store<IAppState>) {
    super();
    this._burgerClicked = new EventEmitter<boolean>();
    this._profileClicked = new EventEmitter<boolean>();
    this.isLogoVisible = true;

    this.disposeOnDestroy(store.select((state: IAppState) => state.user).subscribe(value => {
      this.user = value;
    }));
  }

  ngOnInit() {
    if(window.innerWidth >= 1200) {
      this.onBurgerClicked();
    }
  }

  private onBurgerClicked(): void {
    this._burgerClicked.emit(true);
    this.isLogoVisible = !this.isLogoVisible;
  }

  private onProfileClicked(): void {
    this._profileClicked.emit(true);
  }
}
