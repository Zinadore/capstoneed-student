import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Project } from '../../../../shared/Store/Models/project';
import { Assignment } from '../../../../shared/Store/Models/assignment';
import * as moment from 'moment';
import { Iteration } from '../../../../shared/Store/Models/iteration';

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
  @Input() project: Project;
  @Input() assignment: Assignment;
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
      let end: any = moment(this.assignment.end_date, 'YYYY-MM-DD').toDate();
      let start: any = moment(this.assignment.start_date, 'YYYY-MM-DD').toDate();
      this.percentage_completed = Math.round((this.now - start) / (end - start) * 1000);
  }

  getIterationsCompleted(): string {
    let accumulator = 0;
    for(let i = 0; i < this.assignment.iterations.length; i++) {
      let it = this.assignment.iterations[i];
      if(this.isIterationCompleted(it)) {
        accumulator++;
      }
    }
    return `${accumulator}/${this.assignment.iterations.length}`;
  }

  private isIterationCompleted(iteration: Iteration): boolean {
    if(!iteration)
      return false;
    return new Date(iteration.deadline) <= this.now;
  }

  iteration_progress(iteration: Iteration): number {
    if(iteration.start_date >= this.now) {
      return 0;
    }
    let end: any = moment(iteration.deadline, 'YYYY-MM-DD').toDate();
    let start: any = moment(iteration.start_date, 'YYYY-MM-DD').toDate();
    return Math.round((this.now - start) / (end -start) * 1000);

  }


}
