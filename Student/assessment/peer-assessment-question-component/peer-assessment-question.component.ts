import {
  Component, OnInit, Input, AfterViewInit, ComponentFactoryResolver, ViewContainerRef,
  ComponentRef, OnChanges
} from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Question } from '../../../../shared/Store/Models/question';
import { Project } from '../../../../shared/Store/Models/project';
import { FormWizardStepComponent } from '../../../../shared/Directives/formWizardStep - component/formWizardStep.component';
import { Observable } from 'rxjs';
import { RangeQuestionComponent } from '../range-question-component/range-question.component';

@Component({
  selector: 'ced-pa-question',
  templateUrl: 'peer-assessment-question.component.html',
  styleUrls: ['peer-assessment-question.component.scss']
})
export class PeerAssessmentQuestionComponent extends ComponentBase implements OnInit, AfterViewInit, OnChanges {

  @Input() question: Question;
  @Input() project: Project;
  @Input() index: number;

  private questionComponent: ComponentRef<any>;



  constructor(private step: FormWizardStepComponent,
              private vcRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(RangeQuestionComponent);
    this.questionComponent = this.vcRef.createComponent(factory);

    this.questionComponent.instance.students_input = this.project.students;
  }

  ngAfterViewInit() {
    this.step.stepTitle = `Question ${this.index + 1}`;
    this.step.registerCanGoNext(Observable.of(true));
    this.step.registerOnNext(() => {

    })
  }

  ngOnChanges() {
    if(this.project && this.questionComponent) {
      this.questionComponent.instance.students_input = this.project.students;
    }
  }

  destroy() {
    this.questionComponent.destroy();
  }



}
