import { Component, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'ced-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  host: {
    class: 'navbar navbar-fixed-top navbar-light'
  }
})
export class HeaderComponent {

  @Output('burgerClicked') _burgerClicked: EventEmitter<boolean>;
  @Output('profileClicked') _profileClicked: EventEmitter<boolean>;
  @HostBinding('class.with-logo') isLogoVisible: boolean;


  constructor() {
    this._burgerClicked = new EventEmitter<boolean>();
    this._profileClicked = new EventEmitter<boolean>();
    this.isLogoVisible = true;
  }

  private onBurgerClicked(): void {
    this._burgerClicked.emit(true);
    this.isLogoVisible = !this.isLogoVisible;
  }

  private onProfileClicked(): void {
    this._profileClicked.emit(true);
  }
}
