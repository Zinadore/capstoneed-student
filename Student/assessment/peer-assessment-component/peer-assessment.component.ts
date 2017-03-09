import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Observable } from 'rxjs';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../shared/Store/Models/project';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'ced-peer-assessment',
  templateUrl: 'peer-assessment.component.html'
})
export class PeerAssessmentComponent extends ComponentBase implements OnInit {
  private assessment: Observable<PeerAssessmentForm>;
  private project: Observable<Project>;

  constructor(private store: Store<IAppState>, route: ActivatedRoute) {
    super();

    this.assessment = route.params
      .filter(params => params['id'])
      .map(params => params['id'])
      .switchMap(id => this.store.select((state: IAppState)=> state.pa_forms)
        .map(forms => forms.find(f => f.id == id))
      );

    this.project = this.assessment
      .filter(a => !isNullOrUndefined(a))
      .map(a => a.project_id)
      .switchMap(id => this.store.select((state: IAppState)=> state.projects)
        .map(projects => projects.find(p => p.id == id))
      );

  }

  ngOnInit() {
  }


}
