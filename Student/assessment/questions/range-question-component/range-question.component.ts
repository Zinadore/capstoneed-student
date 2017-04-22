import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ComponentBase } from '../../../../../shared/Directives/componentBase';
import { DragulaService } from 'ng2-dragula';
import { Question } from '../../../../../shared/Store/Models/question';

@Component({
  selector: 'ced-range-question',
  templateUrl: 'range-question.component.html',
  styleUrls: ['range-question.component.scss'],
  providers: [DragulaService]
})
export class RangeQuestionComponent extends ComponentBase implements OnInit {

  @Input() set students_input(value: any[]) {
    if(!value) {
      return;
    }

    for(let i = 0; i < value.length; i ++) {
      this.students.push(value[i]);
    }
  }

  @Input() question_input: Question;

  private students = [];
  private isHelpCollapsed: boolean;

  public categories: any[][];
  public answersEventEmiter: EventEmitter<number>;

  constructor(private dragulaService: DragulaService) {
    super();

    this.isHelpCollapsed = true;
    this.answersEventEmiter = new EventEmitter<number>();

    this.categories = [];
    for(let i = 0; i < 5; i++) {
      this.categories[i] = [];
    }

    this.disposeOnDestroy(this.dragulaService.drop.subscribe(value => {
      this.answersEventEmiter.emit(this.students.length);
    }));
  }

  ngOnInit() {

  }

  toggleHelp(): void {
    this.isHelpCollapsed = !this.isHelpCollapsed;
    console.log(this.isHelpCollapsed);
  }

  destroy() {
    this.dragulaService.destroy('students');
  }

}
