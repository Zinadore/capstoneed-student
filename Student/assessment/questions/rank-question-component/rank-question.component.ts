import { Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../../shared/Directives/componentBase';
import { Question } from '../../../../../shared/Store/Models/question';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'ced-rank-question',
  templateUrl: 'rank-question.component.html',
  styleUrls: ['rank-question.component.scss'],
  providers: [DragulaService]
})
export class RankQuestionComponent extends ComponentBase implements OnInit {

  @Input() set students_input(value: any[]) {
    if(!value) {
      return;
    }

    for(let i = 0; i < value.length; i ++) {
      this.students.push(value[i]);
    }
  }

  @Input() question_input: Question;

  get ranked_students() {
    return this.students;
  }

  public students = [];
  public isHelpCollapsed: boolean = true;

  constructor(private dragulaService: DragulaService) {
    super();
    this.dragulaService.setOptions('rank-bag', {
      revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,
      copy: false
    });

    // this.dragulaService.dropModel.subscribe(value => console.log(value));

    // let drake = this.dragulaService.find('rank-bag');

    // drake.drake.setOptions({
    //   revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    //   removeOnSpill: false
    // })

  }

  ngOnInit() {
  }

  destroy() {
    this.dragulaService.destroy('rank-bag');
  }

  public toggleHelp() {
    this.isHelpCollapsed = !this.isHelpCollapsed;
  }


}
