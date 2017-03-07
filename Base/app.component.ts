import '../../style/app.scss';

import { Component } from '@angular/core';

@Component({
  selector: 'ced-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private _rightOpen: boolean;
  private _leftOpen: boolean;

  constructor() {
    this._rightOpen = this._leftOpen = false;
  }

  toggleRight(): void {
    this._rightOpen = !this._rightOpen;
  }

  toggleLeft(): void {
    this._leftOpen = !this._leftOpen;
  }
}
