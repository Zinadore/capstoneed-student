import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Project } from '../../../../shared/Store/Models/project';
import { Observable } from 'rxjs';
import { Assignment } from '../../../../shared/Store/Models/assignment';

@Component({
  selector: 'ced-project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.scss']
})
export class ProjectListComponent extends ComponentBase implements OnInit {
  private project$: Observable<Project[]>;

  constructor(private store: Store<IAppState>) {
    super();

    this.project$ = store.select(state => state.projects);
  }

  ngOnInit() {
  }


  private getAssignment(assignment_id: number):Observable<Assignment> {
    return this.store.select(state => state.assignments).map(assignments=> assignments.find(a => a.id == assignment_id));
  }

}
