import {
  Component, OnInit, Input, ViewChild, HostListener, Output, EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment/moment';


@Component({
  selector: 'ced-logs-display',
  templateUrl: 'logs-display.component.html',
  styleUrls: ['logs-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsDisplayComponent extends ComponentBase implements OnInit {

  @Input('logs') log_entries: LogEntry[];
  @Input('title') component_title: string = 'Project Logs';
  @ViewChild('logs_table') logsTable: DatatableComponent;
  @Output('logSelected') logSelectedEmitter = new EventEmitter<number>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getDateFromUnix(date) {
    return moment.unix(date);
  }

  emitLog(index: number) {
    this.logSelectedEmitter.emit(index);
  }

}
