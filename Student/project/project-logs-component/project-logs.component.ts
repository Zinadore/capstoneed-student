import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../shared/Services/project.service';
import { LogEntryService } from '../../../../shared/Services/log-entry.service';
import { Project } from '../../../../shared/Store/Models/project';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';

@Component({
  selector: 'ced-project-logs',
  templateUrl: 'project-logs.component.html',
  styleUrls: ['project-logs.component.scss']
})
export class ProjectLogsComponent extends ComponentBase implements OnInit {
  public project: Project;
  public logs: LogEntry[];
  public selectedLog: LogEntry;

  constructor(route: ActivatedRoute, projectService: ProjectService, store: Store<IAppState>, private logService: LogEntryService) {
    super();

    let idObservable = route.params
      .filter(params => params['id'])
      .map(params => params['id']);

    this.disposeOnDestroy(idObservable.subscribe(id => {
      projectService.get(id);
      this.logService.getAll(id);
    }));

    this.disposeOnDestroy(idObservable.switchMap(id =>
      store.select((state: IAppState) => state.projects)
        .map(projects => projects.find(p => p.id == id))
      )
      .subscribe(project => this.project = project)
    );

    this.disposeOnDestroy(store.select((state: IAppState) => state.logs)
      .subscribe(logs => {
        this.logs = logs;
        this.selectedLog = logs[0];
      })
    );

  }

  ngOnInit() {
  }

  public onLogSelected(index: number): void {
    this.selectedLog = this.logs[index];
  }

}
