import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Unit } from '../../../../shared/Store/Models/unit';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ced-unit-list',
  templateUrl: 'unit-list.component.html'
})
export class UnitListComponent extends ComponentBase implements OnInit {

  private units: Observable<Unit[]>;

  constructor(private store: Store<IAppState>) {
    super();

    this.units = store.select((state: IAppState) => state.units);
  }

  ngOnInit() {
  }


}
