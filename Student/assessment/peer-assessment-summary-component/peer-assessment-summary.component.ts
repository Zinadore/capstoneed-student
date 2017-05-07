import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../shared/Store/Models/project';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { PeerAssessment } from '../../../../shared/Store/Models/peer-assessment';
import { Question } from '../../../../shared/Store/Models/question';
import { QUESTION_TYPE_TEXT } from '../../../../shared/Store/Models/question-type';

@Component({
  selector: 'ced-peer-assessment-summary',
  templateUrl: 'peer-assessment-summary.component.html',
  styleUrls: ['peer-assessment-summary.component.scss']
})
export class PeerAssessmentSummaryComponent  implements OnInit {

  @Input('project') PeerAssessmentSummaryComponent_Project: Project;
  @Input('peer-assessment-form') PeerAssessmentSummaryComponent_PAForm: PeerAssessmentForm;
  @Input('peer-assessments') PeerAssessmentSummaryComponent_Assessments: PeerAssessment[];

  constructor() {
  }

  ngOnInit() {
  }


  public getNonTextQuestions(): Question[] {
    if(!this.PeerAssessmentSummaryComponent_PAForm) return [];

    return this.PeerAssessmentSummaryComponent_PAForm.questions.filter((q: Question) => q.question_type.question_type !== QUESTION_TYPE_TEXT);
  }

  public getTextQuestions(): Question[] {
    if(!this.PeerAssessmentSummaryComponent_PAForm) return [];

    return this.PeerAssessmentSummaryComponent_PAForm.questions.filter((q: Question) => q.question_type.question_type === QUESTION_TYPE_TEXT);
  }

  public getQuestionAnswer(question_id: number, student_id:number ): any {
    if(this.PeerAssessmentSummaryComponent_Assessments.length == 0) {
      return [];
    }
    let pa = this.PeerAssessmentSummaryComponent_Assessments.find(pas => pas.submitted_for_id == student_id);
    let result = pa.answers.find(ans => ans.question_id == question_id);

    if(!result) {
      return [];
    }

    return result.answer;
  };

}
