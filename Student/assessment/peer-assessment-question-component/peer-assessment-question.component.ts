import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Question } from '../../../../shared/Store/Models/question';
import { Project } from '../../../../shared/Store/Models/project';
import { FormWizardStepComponent } from '../../../../shared/Directives/formWizardStep - component/formWizardStep.component';
import { Observable } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'ced-pa-question',
  templateUrl: 'peer-assessment-question.component.html',
  styleUrls: ['peer-assessment-question.component.scss']
})
export class PeerAssessmentQuestionComponent extends ComponentBase implements OnInit, AfterViewInit {

  @Input() question: Question;
  @Input() project: Project;
  @Input() index: number;

  private students = [];
  private category1 = [];
  private category2 =[];

  constructor(private step: FormWizardStepComponent, private dragulaService: DragulaService) {
    super();
    this.dragulaService.drop.subscribe(value => console.log(value));
    this.dragulaService.dropModel.subscribe(value => console.log(value));
  }

  ngOnInit() {
    // this.project.students.forEach(s => this.students.push(s));
    for(let i = 0; i < this.project.students.length; i ++) {
      this.students.push(this.project.students[i]);
    }
  }

  ngAfterViewInit() {
    this.step.stepTitle = `Question ${this.index + 1}`;
    this.step.registerCanGoNext(Observable.of(true));
    this.step.registerOnNext(() => {
      console.log(this.students);
      console.log(this.category1);
      console.log(this.category2);
    })
  }



}
