import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'ced-logs-display',
  templateUrl: 'logs-display.component.html'
})
export class LogsDisplayComponent extends ComponentBase implements OnInit {

  @Input('logs') log_entries: LogEntry[];
  @Input('title') component_title: string = 'Project Logs';
  @ViewChild('logs_table') logsTable: DatatableComponent;
  // @HostListener('window:resize', ['$event']) onResize = (event) => {
  //   if(this.logsTable) {
  //     this.logsTable.recalculate();
  //     this.logsTable.recalculateDims();
  //     console.log('Should recalculate');
  //   }
  // };
  constructor() {
    super();
  }

  ngOnInit() {

  }


}
