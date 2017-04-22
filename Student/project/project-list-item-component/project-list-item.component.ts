import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Project } from '../../../../shared/Store/Models/project';
import { Assignment } from '../../../../shared/Store/Models/assignment';
import * as moment from 'moment';
import { Iteration } from '../../../../shared/Store/Models/iteration';
import { ProjectHelpers } from '../../../../shared/Helpers/project.helpers';
import { IterationHelpers } from '../../../../shared/Helpers/iteration.helpers';

@Component({
  selector: 'ced-project-list-item',
  templateUrl: 'project-list-item.component.html',
  styleUrls: ['project-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'card'
  }
})
export class ProjectListItemComponent extends ComponentBase implements OnChanges {
  private _project: Project;
  @Input() set project(value) {
    console.log(value);
    this._project = value;
  }

  get project() {
    return this._project;
  }

  private _assignment: Assignment;
  @Input() set assignment(value) {
    console.log(value);
    this._assignment = value;
  }

  get assignment() {
    return this._assignment;
  }
  private trim_length: number = 15;
  private percentage_completed: number = 0;
  private now: any = moment().toDate();
  private get truncated_description(): string {
    return (this.project.description.length > this.trim_length)? `${this.project.description.substring(0, this.trim_length)}...` : this.project.description;
  }

  constructor() {
    super();
  }

  ngOnChanges() {
    this.percentage_completed = ProjectHelpers.timePassedPercentage(this.assignment, this.now);
  }

  getIterationsCompleted(): string {
    let completed = ProjectHelpers.getNumberOfIterationsCompleted(this.assignment.iterations, this.now);
    return `${completed}/${this.assignment.iterations.length || 0}`;
  }

  // private isIterationCompleted(iteration: Iteration): boolean {
  //   // if(!iteration)
  //   //   return false;
  //   return new Date(iteration.deadline) <= this.now;
  // }

  iteration_progress(iteration: Iteration): number {
    return IterationHelpers.getProgressPercent(iteration, this.now);
  }


}
