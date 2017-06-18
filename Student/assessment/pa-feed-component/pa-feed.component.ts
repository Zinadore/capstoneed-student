import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { PeerAssessmentService } from '../../../../shared/Services/peer-assessment.service';
import { Observable } from 'rxjs';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { Project } from '../../../../shared/Store/Models/project';
import { Iteration } from '../../../../shared/Store/Models/iteration';
import { Assignment } from '../../../../shared/Store/Models/assignment';

@Component({
  selector: 'ced-pa-feed',
  templateUrl: 'pa-feed.component.html',
  styleUrls: ['pa-feed.component.scss']
})
export class PaFeedComponent extends ComponentBase implements OnInit {
  private assessments: Observable<PeerAssessmentForm[]>;
  private scoredIterations: Iteration[];

  constructor(private store: Store<IAppState>, private assessmentService: PeerAssessmentService) {
    super();

    this.assessments = this.store.select((state: IAppState) => state.pa_forms);

    let source = Observable.combineLatest(
      this.store.select((state: IAppState) => state.projects),
      this.store.select((state: IAppState) => state.scored_iterations),
      this.store.select((state: IAppState) => state.assignments),
      this.doStuff
    );

    this.disposeOnDestroy(source.subscribe(its => this.scoredIterations = its));
  }

  ngOnInit() {
    this.assessmentService.getAllActive();
    this.assessmentService.getAllScored();
  }

  getProject(project_id: number): Observable<Project> {
    return this.store.select(state => state.projects).map(projects => projects.find(p => p.id == project_id));
  }

  doStuff(projects: Project[], scoredIterations: Iteration[], assignments: Assignment[]): Iteration[] {

    for(let it of scoredIterations) {
      it.project = projects.find(p => p.assignment_id === it.assignment_id);
      it.assignment = assignments.find(a => a.id === it.assignment_id);
    }

    return scoredIterations;
  }

}
