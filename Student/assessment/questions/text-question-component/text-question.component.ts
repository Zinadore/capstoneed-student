import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ComponentBase } from '../../../../../shared/Directives/componentBase';
import { Question } from '../../../../../shared/Store/Models/question';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ced-text-question',
  templateUrl: 'text-question.component.html'
})
export class TextQuestionComponent extends ComponentBase implements OnInit {

  @Input('question') question_input: Question;
  @Input('students') set students_input(value){
    if(!value) {
      return;
    }

    for(let i = 0; i < value.length; i ++) {
      this.students.push(value[i]);
      if(this.answerForm) {
        this.addFormComponent();
      }
    }
  }
  public get isFormValid() { return this._isFormValid.asObservable(); }
  public get answers() {
    if(!this.answerForm || !this.answerForm.valid) {
      return []
    }

    let result = [];
    let comp = <FormArray>this.answerForm.controls['texts'];
    for(let s = 0; s < this.students.length; s++) {
      let student = this.students[s];
      result.push({
        question_id: this.question_input.question_id,
        answer: comp.at(s).value['answerText'],
        student_id: student.id
      })
    }


    return result;
  }

  private students: any[];
  private answerForm: FormGroup;

  private _isFormValid: BehaviorSubject<boolean>;

  constructor(private fb: FormBuilder) {
    super();
    this._isFormValid = new BehaviorSubject<boolean>(true);
    this.students = [];
  }

  ngOnInit() {
    this.answerForm = this.fb.group({
      texts: this.fb.array([
      ])
    });

    let controls = <FormArray>this.answerForm.controls['texts'];
    if(controls.length != this.students.length) {
      controls.setValue([]);
      for(let i = 0; i < this.students.length; i ++) {
          this.addFormComponent();
      }
    }


    this.disposeOnDestroy(this.answerForm.valueChanges.throttleTime(200).subscribe(value => {
      this._isFormValid.next(this.answerForm.valid);
    }))
  }

  private addFormComponent() {
    let comp = <FormArray>this.answerForm.controls['texts'];

    comp.push(
      this.fb.group({
        answerText: ''
      })
    )
  }



}
