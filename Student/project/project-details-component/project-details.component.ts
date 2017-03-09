import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Project } from '../../../../shared/Store/Models/project';

@Component({
  selector: 'ced-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends ComponentBase implements OnInit {
  private project: Project;

  constructor(private route:ActivatedRoute, private store: Store<IAppState>) {
    super();

    this.disposeOnDestroy(route.params.filter(params => params['id'])
      .map(params => params['id'])
      .switchMap(id => store.select(state => state.projects)
        .map(projects => projects.find(p => p.id == id))
      ).subscribe(project => this.project = project)
    )
  }

  ngOnInit() {
  }


}
