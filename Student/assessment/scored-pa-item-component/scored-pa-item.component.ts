import {
  Component, Input, HostBinding, OnInit, AfterViewInit, OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { Project } from '../../../../shared/Store/Models/project';
import * as moment from 'moment/moment';
import { Iteration } from '../../../../shared/Store/Models/iteration';
import { Assignment } from '../../../../shared/Store/Models/assignment';
@Component({
  selector: 'ced-scored-pa-item',
  templateUrl: 'scored-pa-item.component.html',
  styleUrls: ['scored-pa-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoredPaItemComponent implements OnChanges {

  public _assignment: Assignment;
  @Input('assignment') set ScoredPaItemComponent_Assignment(value: Assignment) {
    this._assignment = value;
  }

  public _project: Project;
  @Input('project') set ScoredPaItemComponent_Project(value: Project) {
    this._project = value;
  }

  public _iteration: Iteration;
  @Input('iteration') set ScoredPaItemComponent_Iteration(value: Iteration) {
    this._iteration = value;
  }

  @HostBinding('style.border-left-color') border_color = 'black';

  constructor() {

  }

  ngOnChanges() {
    if(this._iteration.project)
      this.border_color = this._iteration.project.color;
  }


}
