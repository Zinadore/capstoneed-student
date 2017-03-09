import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Question } from '../../../../shared/Store/Models/question';
import { Project } from '../../../../shared/Store/Models/project';
import { FormWizardStepComponent } from '../../../../shared/Directives/formWizardStep - component/formWizardStep.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ced-pa-question',
  templateUrl: 'peer-assessment-question.component.html'
})
export class PeerAssessmentQuestionComponent extends ComponentBase implements OnInit, AfterViewInit {

  @Input() question: Question;
  @Input() project: Project;
  @Input() index: number;

  constructor(private step: FormWizardStepComponent) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.step.stepTitle = `Question ${this.index + 1}`;
    this.step.registerCanGoNext(Observable.of(true));
  }

}
