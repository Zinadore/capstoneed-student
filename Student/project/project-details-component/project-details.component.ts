import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Project } from '../../../../shared/Store/Models/project';
import { ProjectHelpers } from '../../../../shared/Helpers/project.helpers';
import { isNullOrUndefined } from 'util';
import { Assignment } from '../../../../shared/Store/Models/assignment';
import { Iteration } from '../../../../shared/Store/Models/iteration';
import { IterationHelpers } from '../../../../shared/Helpers/iteration.helpers';

@Component({
  selector: 'ced-project-details',
  templateUrl: 'project-details.component.html',
  styleUrls: ['project-details.component.scss'],
})
export class ProjectDetailsComponent extends ComponentBase implements OnInit, AfterViewInit {
  private project: Project;
  private assignment: Assignment;
  private project_percentage: number = 0;
  private now: number = Date.now();

  public isDescriptionClosed: boolean;
  public isTeamClosed: boolean;

  @ViewChildren('contrib') contribSpans: ElementRef[];

  constructor(private route:ActivatedRoute, private store: Store<IAppState>, private renderer: Renderer2) {
    super();

    let projectSource = route.params.filter(params => params['id'])
      .map(params => params['id'])
      .switchMap(id => store.select(state => state.projects)
        .map(projects => projects.find(p => p.id == id))
        .filter(p => !isNullOrUndefined(p))
      );

    let assignmentSource = projectSource
      .map(project => project.assignment_id)
      .switchMap(id => store.select((state: IAppState) => state.assignments)
        .map(assignments => assignments.find(a => a.id == id))
        .filter(a => !isNullOrUndefined(a))
      );

    this.project_percentage = 0;
    this.isDescriptionClosed = true;
    this.isTeamClosed = false;
    this.disposeOnDestroy(projectSource.subscribe(project => {
        this.project = project;
      })
    );

    this.disposeOnDestroy(assignmentSource.subscribe(assignment => {
      this.project_percentage = ProjectHelpers.timePassedPercentage(assignment, this.now);
      this.assignment = assignment;
    }))
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // for(let e of this.contribSpans) {
    //   this.renderer.addClass(e.nativeElement, 'tada');
    // }
  }

  toggleDescription() {
    this.isDescriptionClosed = !this.isDescriptionClosed;
  }

  toggleTeam(): void {
    this.isTeamClosed = !this.isTeamClosed;
  }

  iteration_progress(iteration: Iteration) {
    let result = IterationHelpers.getProgressPercent(iteration, this.now);
    return result;
  }


}
