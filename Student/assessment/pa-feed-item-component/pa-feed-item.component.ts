import {
  Component, Input, HostBinding, OnInit, AfterViewInit, OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { Project } from '../../../../shared/Store/Models/project';
import * as moment from 'moment/moment';
@Component({
  selector: 'ced-pa-feed-item',
  templateUrl: 'pa-feed-item.component.html',
  styleUrls: ['pa-feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaFeedItemComponent implements OnChanges {
  @Input('assessment') _pa_form: PeerAssessmentForm;
  @Input('project') _form_project: Project;
  @HostBinding('style.border-left-color') border_color = 'black';

  private time_remaining = '';
  private now = Date.now();
  private deadline;
  constructor() {

  }

  ngOnChanges() {
    if(this._form_project)
      this.border_color = this._form_project.color;
    if(!this.deadline)
      this.deadline =new Date(this._pa_form.deadline);

    let left = this.deadline - this.now;
    let days = moment(left).get('days');

    if(0 < days && days < 1) {
      this.time_remaining = 'This is the last day!';
    } else if(days >= 1) {
      this.time_remaining = `${days} day(s) left`;
    } else {
      this.time_remaining = 'The assessment has expired';
    }


  }


}
