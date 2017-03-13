import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../../../shared/Services/project.service';
import { Project } from '../../../../shared/Store/Models/project';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { CedValidators } from '../../../../shared/Directives/ced.validators';
import { LogEntryService } from '../../../../shared/Services/log-entry.service';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';

@Component({
  selector: 'ced-logs',
  templateUrl: 'logs.component.html'
})
export class LogsComponent extends ComponentBase implements OnInit {

  private projectSelectionForm: FormGroup;
  private projects: Project[];
  private logs: LogEntry[];


  constructor(private fb: FormBuilder, private projectService: ProjectService, private store: Store<IAppState>,
              private logService: LogEntryService)
  {
    super();

    this.disposeOnDestroy(store.select(state => state.projects)
      .subscribe(projects => this.projects = projects)
    );

    this.disposeOnDestroy(store.select((state: IAppState) => state.logs)
      .subscribe(logs => this.logs = logs)
    )
  }

  ngOnInit() {
    this.projectService.getAllActive();
    this.projectSelectionForm = this.fb.group({
      project: ['0', CedValidators.notSelectedValue("0")]
    });

    let pSelect = this.projectSelectionForm.get('project');

    this.disposeOnDestroy(pSelect.valueChanges
      .filter(_ => pSelect.valid)
      .subscribe(id => this.logService.getAll(id))
    )
  }


}
