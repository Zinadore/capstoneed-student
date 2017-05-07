///<reference path="../../../../../shared/Store/Models/question-type.ts"/>
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnChanges, ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { ComponentBase } from '../../../../../shared/Directives/componentBase';
import { Question } from '../../../../../shared/Store/Models/question';
import { Project } from '../../../../../shared/Store/Models/project';
import { FormWizardStepComponent } from '../../../../../shared/Directives/formWizardStep - component/formWizardStep.component';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  QUESTION_TYPE_TEXT, QUESTION_TYPE_NUMBER,
  QUESTION_TYPE_RANK
} from '../../../../../shared/Store/Models/question-type';
import { UnknownQuestionComponent } from '../unknown-question.component';
import { RangeQuestionComponent } from '../range-question-component/range-question.component';
import { TextQuestionComponent } from '../text-question-component/text-question.component';
import { RankQuestionComponent } from '../rank-question-component/rank-question.component';

@Component({
  selector: 'ced-pa-question',
  templateUrl: 'peer-assessment-question.component.html',
  styleUrls: ['peer-assessment-question.component.scss']
})
export class PeerAssessmentQuestionComponent extends ComponentBase implements OnInit, AfterViewInit, OnChanges {

  @Input() question: Question;
  @Input() project: Project;
  @Input() index: number;

  @Output() answersOutput: EventEmitter<any>;

  private questionComponent: ComponentRef<any>;
  private canGoNextSubject: BehaviorSubject<boolean>;


  constructor(private step: FormWizardStepComponent,
              private vcRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
    super();
    this.canGoNextSubject = new BehaviorSubject<boolean>(false);
    this.answersOutput = new EventEmitter<any>();
  }

  ngOnInit() {
    this.figureOutAndCompileQuestionComponent();
    this.step.stepTitle = `Question ${this.index + 1}`;
  }

  ngAfterViewInit() {
    this.step.registerCanGoNext(this.canGoNextSubject.asObservable());
  }

  ngOnChanges() {
    if(this.project && this.questionComponent) {
      this.questionComponent.instance.students_input = this.project.students || [];
      this.questionComponent.instance.question_input = this.question;
    }
  }

  destroy() {
    this.questionComponent.destroy();
  }

  private figureOutAndCompileQuestionComponent(): void {
    if(this.questionComponent) {
      this.questionComponent.destroy();
    }

    switch(this.question.question_type.question_type) {
      case QUESTION_TYPE_NUMBER: {
        let factory = this.resolver.resolveComponentFactory(RangeQuestionComponent);
        this.questionComponent = this.vcRef.createComponent(factory);

        this.questionComponent.instance.students_input = this.project? this.project.students : [];
        this.questionComponent.instance.question_input = this.question;
        // this.canGoNextSubject.next(true);
        //
        // setTimeout(() => {
        //   this.canGoNextSubject.next(false);
        // }, 1500);
        this.disposeOnDestroy(this.questionComponent.instance.answersEventEmitter.subscribe(value => {
          let result = value == 0;
          this.canGoNextSubject.next(result);
        }));

        this.step.registerOnNext(this.numberStep_OnNext);
      } break;
      case QUESTION_TYPE_TEXT: {
        let factory = this.resolver.resolveComponentFactory(TextQuestionComponent);
        this.questionComponent = this.vcRef.createComponent(factory);

        this.questionComponent.instance.students_input = this.project? this.project.students : [];
        this.questionComponent.instance.question_input = this.question;

        this.disposeOnDestroy(this.questionComponent.instance.isFormValid.subscribe(value => {
          this.canGoNextSubject.next(value);
        }));

        this.step.registerOnNext(this.textStep_OnNext);
      } break;

      // case QUESTION_TYPE_NUMBER:
      case QUESTION_TYPE_RANK: {
        let factory = this.resolver.resolveComponentFactory(RankQuestionComponent);
        this.questionComponent = this.vcRef.createComponent(factory);

        this.questionComponent.instance.students_input = this.project? this.project.students : [];
        this.questionComponent.instance.question_input = this.question;

        // this.disposeOnDestroy(this.questionComponent.instance.isFormValid.subscribe(value => {
        //   this.canGoNextSubject.next(value);
        // }));

        this.canGoNextSubject.next(true);
        this.step.registerOnNext(this.rankStep_OnNext);


      }break;

      default: {
        let factory = this.resolver.resolveComponentFactory(UnknownQuestionComponent);
        this.questionComponent = this.vcRef.createComponent(factory);

        this.questionComponent.instance.question = this.question;
        this.canGoNextSubject.next(true);
      }
    }
  }

  public textStep_OnNext: Function = () => {
    let formAnswers = this.questionComponent.instance.answers;

    let result = [];

    for (let formAnswer of formAnswers) {
      result.push({ student_id: formAnswer.student_id, answer: formAnswer.answer, question_id: formAnswer.question_id })
    }

    this.answersOutput.emit(result);
  };

  public numberStep_OnNext: Function = () => {

    let categories = this.questionComponent.instance.categories;
    let result = [];

    for(let cat = 0; cat < categories.length; cat++) {
      for(let student of categories[cat]) {
        result.push({ student_id: student.id, answer: cat + 1, question_id: this.question.question_id });
      }
    }

    this.answersOutput.emit(result);
  };

  public rankStep_OnNext: Function = () => {
    let ranked_students = this.questionComponent.instance.ranked_students;
    let result = [];

    for(let index = 0; index < ranked_students.length; index++) {
      let curr = ranked_students[index];
      // console.log(curr);
      result.push({ student_id: curr.id, answer: (ranked_students.length - index), question_id: this.question.question_id });
    }
    // console.log(result);
    this.answersOutput.emit(result);
  };

  public debug(): void {
    this.canGoNextSubject.next(true);
  }
}
