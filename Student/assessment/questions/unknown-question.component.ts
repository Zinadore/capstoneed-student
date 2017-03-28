import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Question } from '../../../../shared/Store/Models/question';

@Component({
  selector: 'ced-unkown-question',
  template: `<div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Something went wrong</h4>
                <p>Could not find component for question type: {{question.question_type.friendly_name}}.</p>
                <p class="mb-0">Please inform a lecturer because this shouldn't happen.</p>
             </div>

`
})
export class UnknownQuestionComponent extends ComponentBase implements OnInit {

  @Input() question: Question;


  constructor() {
    super();
  }

  ngOnInit() {
  }


}
