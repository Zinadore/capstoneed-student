import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'ced-range-question',
  templateUrl: 'range-question.component.html',
  styleUrls: ['range-question.component.scss']
})
export class RangeQuestionComponent extends ComponentBase implements OnInit {

  @Input() students_input: any[];

  private students = [];
  private category1 = [];
  private category2 =[];

  constructor(private dragulaService: DragulaService) {
    super();

    this.dragulaService.drop.subscribe(value => console.log(value));
    this.dragulaService.dropModel.subscribe(value => console.log(value));
  }

  ngOnInit() {
  // this.project.students.forEach(s => this.students.push(s));
    for(let i = 0; i < this.students_input.length; i ++) {
      this.students.push(this.students_input[i]);
    }
  }


}
