import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { PeerAssessmentService } from '../../../../shared/Services/peer-assessment.service';
import { Observable } from 'rxjs';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { Project } from '../../../../shared/Store/Models/project';

@Component({
  selector: 'ced-pa-feed',
  templateUrl: 'pa-feed.component.html',
  host: {
    class: 'card'
  }
})
export class PaFeedComponent extends ComponentBase implements OnInit {
  private assessments: Observable<PeerAssessmentForm[]>;
  constructor(private store: Store<IAppState>, private assessmentService: PeerAssessmentService) {
    super();

    this.assessments = this.store.select((state: IAppState) => state.pa_forms);
  }

  ngOnInit() {
    this.disposeOnDestroy(this.assessmentService.getAllActive().subscribe());
  }

  getProject(project_id: number): Observable<Project> {
    return this.store.select(state => state.projects).map(projects => projects.find(p => p.id == project_id));
  }

}
