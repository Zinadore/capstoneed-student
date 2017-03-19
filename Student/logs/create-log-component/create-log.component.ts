import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'ngx-mydatepicker';
import { CedValidators } from '../../../../shared/Directives/ced.validators';
import { LogEntry } from '../../../../shared/Store/Models/log-entry';
import { LogEntryService } from '../../../../shared/Services/log-entry.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'ced-create-log',
  templateUrl: 'create-log.component.html',
  styleUrls:['create-log.component.scss']
})
export class CreateLogComponent extends ComponentBase implements OnInit {
  private logForm: FormGroup;
  private createSub: Subscription;
  @Input('id') project_id: number;
  @Input('open') showOpen: boolean;

  private myOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private fb: FormBuilder, private logService: LogEntryService) {
    super();
  }

  ngOnInit() {
    this.logForm = this.fb.group({
      date_worked: ['', Validators.required],
      time_worked: [0, Validators.compose([CedValidators.notSelectedValue(0), Validators.required])],
      log_comment: '',
      stage: ['0', CedValidators.notSelectedValue('0')]
    })
  }

  resetForm(): void {
    this.logForm.reset({
      'date_worked': '',
      'time_worked': 0,
      'log_comment': '',
      'stage': '0'
    });
  }

  submitEntry(): void {
    if(!this.logForm.valid || !this.project_id) {
      console.log(this.project_id);
      return;
    }

    if(this.createSub) {
      this.createSub.unsubscribe();
    }

    let hours_worked = this.logForm.get('time_worked').value;


    let entry: LogEntry = {
      text: this.logForm.get('log_comment').value,
      date_worked: this.logForm.get('date_worked').value.epoc,
      time_worked: hours_worked * 3600,
      stage: this.logForm.get('stage').value,
    };


    this.createSub = this.logService.create(entry, this.project_id)
      .subscribe(
        value => {
          this.logForm.reset({
            'date_worked': '',
            'time_worked': 0,
            'log_comment': '',
            'stage': '0'
          });
          this.showOpen = false;
        },
        err => {
          console.log(err);
        }
      );
  }

  toggleOpen() {
    this.showOpen = !this.showOpen;
  }
}
