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
  private projects:Project[] = [];
  private assignments: Assignment[] = [];

  constructor(store: Store<IAppState>) {
    super();

    this.disposeOnDestroy(store.select(state => state.projects)
      .subscribe(projects => this.projects = projects)
    );
    this.disposeOnDestroy(store.select(state => state.assignments)
      .subscribe(assignments => this.assignments = assignments)
    );
  }

  ngOnInit() {
  }


  private getAssignment(assignment_id: number): Assignment {
    let result = this.assignments.find(a => a.id == assignment_id);
    return result;
  }

}
