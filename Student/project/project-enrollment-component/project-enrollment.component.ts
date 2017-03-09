import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../../shared/Services/project.service';

@Component({
  selector: 'ced-project-enrollment',
  templateUrl: 'project-enrollment.component.html'
})
export class ProjectEnrollmentComponent extends ComponentBase implements OnInit {

  private enrollForm: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.enrollForm = this.fb.group({
      key: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      id: ['', Validators.required]
    })
  }

  onEnroll(): void {
    if(this.enrollForm.valid) {
      let id = Number(this.enrollForm.get('id').value);
      this.projectService.enroll(this.enrollForm.get('key').value, this.enrollForm.get('nickname').value, id);
    }
  }

}
