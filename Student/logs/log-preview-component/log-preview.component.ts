import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';
import { unix } from 'moment/moment';

@Component({
  selector: 'ced-log-preview',
  templateUrl: 'log-preview.component.html',
  styleUrls: ['log-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogPreviewComponent extends ComponentBase implements OnInit {
  @Input('log') log_entry: LogEntry;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getDateFromUnix(date) {
    return unix(date);
  }

}
