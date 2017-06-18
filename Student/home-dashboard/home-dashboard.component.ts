import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../shared/Directives/componentBase';
import { IAppState } from '../../../shared/Store/Reducers/index';
import { Store } from '@ngrx/store';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'ced-home-dashboard',
  templateUrl: 'home-dashboard.component.html',
  styleUrls: ['home-dashboard.component.scss']
})
export class HomeDashboardComponent extends ComponentBase implements OnInit {

  assessmentNumber: number = 0;
  evaluationNumber: number = 0;

  constructor(private store: Store<IAppState>) {
    super();

    this.disposeOnDestroy(store.select((state: IAppState) => state.pa_forms)
      .filter(forms => !isNullOrUndefined(forms))
      .map(forms => forms.length)
      .subscribe(length => this.assessmentNumber = length)
    );

    this.disposeOnDestroy(store.select((state: IAppState) => state.project_evaluations)
      .filter(evals => !isNullOrUndefined(evals))
      .map(evals => evals.length)
      .subscribe(length => this.evaluationNumber = length)
    );
  }

  ngOnInit() {
  }


}
