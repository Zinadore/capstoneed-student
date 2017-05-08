import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../shared/Services/project.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Project } from '../../../../shared/Store/Models/project';
import { Location } from '@angular/common';

@Component({
  selector: 'ced-project-statistics',
  templateUrl: 'project-statistics.component.html',
  styleUrls: ['project-statistics.component.scss']
})
export class ProjectStatisticsComponent extends ComponentBase implements OnInit {

  public project: Project;

  constructor(route: ActivatedRoute, projectService: ProjectService, store: Store<IAppState>, public location: Location) {
    super();

    let idObservable = route.params
      .filter(params => params['id'])
      .map(params => params['id']);

    this.disposeOnDestroy(idObservable.subscribe(id => projectService.get(id)));

    this.disposeOnDestroy(idObservable.switchMap(id =>
        store.select((state: IAppState) => state.projects)
          .map(projects => projects.find(p => p.id == id))
      )
      .subscribe(project => this.project = project)
    )
  }

  ngOnInit() {
  }

}
