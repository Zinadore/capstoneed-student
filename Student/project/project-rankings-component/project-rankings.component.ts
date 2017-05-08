import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Project } from '../../../../shared/Store/Models/project';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ProjectService } from '../../../../shared/Services/project.service';
import { ProjectRanking } from '../../../../shared/Store/Models/project-ranking';

@Component({
  selector: 'ced-project-rankings',
  templateUrl: 'project-rankings.component.html',
  styleUrls: ['project-rankings.component.scss']
})
export class ProjectRankingsComponent extends ComponentBase implements OnInit {

  public project: Project;

  public min: number;
  public target: number;

  private _sortedRankings: ProjectRanking[];
  private _rankings: ProjectRanking[];
  public set rankings(value: ProjectRanking[]) {
    if(!value || !value.length) {
      return;
    }
    this._rankings = value;
    let shorted = value.slice(0).sort((a: ProjectRanking, b: ProjectRanking) => b.total - a.total);

    let maxPoints = shorted[0].total;
    let minPoints = shorted[shorted.length - 1].total;
    let ownPoints = shorted.find((r: ProjectRanking) => r.my_team).total;

    this.target = this.calculateTarget(maxPoints, ownPoints, minPoints);
    this._sortedRankings = shorted;
    this.min = minPoints;
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
      .switchMap(project => projectService.getProjectRankings$(project.assignment_id))
      .subscribe(rankings => this.rankings = rankings)
    );

  }

  ngOnInit() {

  }

  private calculateTarget(maxPoints: number, ownPoints: number, minPoints: number): number {
    let multiplier = (ownPoints < 1000)? 100: 1000;

    // if(maxPoints == ownPoints) {
    //   return Math.ceil(maxPoints * 1.5 / multiplier) * multiplier;
    // }
    //
    // let diff = maxPoints - ownPoints;
    // let result = ownPoints + diff /2;
    //
    // let re = Math.ceil(result / multiplier) * multiplier;
    // return re;

    return Math.ceil(ownPoints / multiplier) * multiplier;
  }

}
