import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Project } from '../../../../shared/Store/Models/project';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ProjectService } from '../../../../shared/Services/project.service';
import { ProjectRanking } from '../../../../shared/Store/Models/project-ranking';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ced-project-rankings',
  templateUrl: 'project-rankings.component.html',
  styleUrls: ['project-rankings.component.scss']
})
export class ProjectRankingsComponent extends ComponentBase implements OnInit {

  public project: Project;
  private _rankings: ProjectRanking[];
  public state: string;

  public set rankings(value: ProjectRanking[]) {
    if(!value || !value.length) {
      return;
    }
    // this._rankings = value.sort((a: ProjectRanking, b: ProjectRanking) => b.total - a.total);
    this._rankings = value;
  };

  public get rankings() {
    return this._rankings;
  }

  constructor(store: Store<IAppState>, route: ActivatedRoute, projectService: ProjectService) {
    super();
    this._rankings = [];
    let project$ = route.params
      .filter(params => params['id'])
      .map(params => params['id'])
      .switchMap(id => store.select((state: IAppState) => state.projects)
        .map(projects => projects.find(p => p.id == id))
      );

    this.disposeOnDestroy(project$.subscribe(project => this.project = project));

    this.disposeOnDestroy(project$.filter(project => !isNullOrUndefined(project))
      .subscribe(project => projectService.getProjectRankings(project.assignment_id))
    );

    this.disposeOnDestroy(store.select((state: IAppState) => state.project_rankings)
      .subscribe(rankings => this.rankings = rankings)
    );
  }

  ngOnInit() {

  }

}
