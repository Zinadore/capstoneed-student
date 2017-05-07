import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../shared/Store/Reducers/index';
import { Observable } from 'rxjs';
import { PeerAssessmentForm } from '../../../../shared/Store/Models/peer-assessment-form';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../shared/Store/Models/project';
import { isNullOrUndefined } from 'util';
import { PeerAssessmentService } from '../../../../shared/Services/peer-assessment.service';
import { PeerAssessment } from '../../../../shared/Store/Models/peer-assessment';


@Component({
  selector: 'ced-peer-assessment',
  templateUrl: 'peer-assessment.component.html',
  styleUrls: ['peer-assessment.component.scss']
})
export class PeerAssessmentComponent extends ComponentBase implements OnInit {
  private assessment: PeerAssessmentForm;
  private project: Project;
  private form_id: number;
  private peerAssessments: PeerAssessment[];

  constructor(private store: Store<IAppState>, route: ActivatedRoute, private paService: PeerAssessmentService) {
    super();

    let idObservable = route.params
      .filter(params => params['id'])
      .map(params => params['id']);

    let assessment$ = idObservable
      .switchMap(id => this.store.select((state: IAppState)=> state.pa_forms)
        .map(forms => forms.find(f => f.id == id))
      )
      .filter((form: PeerAssessmentForm) => !isNullOrUndefined(form))
      .do(form => this.form_id = form.id);

    this.disposeOnDestroy(assessment$
      .subscribe(value => this.assessment = value)
    );

    this.disposeOnDestroy(idObservable.distinctUntilChanged().subscribe(id => {
      this.paService.getForm(id)
    }));

    this.disposeOnDestroy(assessment$
      .filter(a => !isNullOrUndefined(a))
      .map(a => a.project_id)
      .switchMap(id => this.store.select((state: IAppState)=> state.projects)
        .map(projects => projects.find(p => p.id == id))
      )
      .subscribe(value => this.project = value)
    );

    this.peerAssessments = [];
  }

  ngOnInit() {
    this.paService.getAllActive();
  }

  private onReceivedAnswer(event) {
    // These are the objects that the child element emitted
    for(let ansObj of event){

      // Get the existing PeerAssessment object
      let ass = this.peerAssessments.find(pa => pa.submitted_for_id == ansObj.student_id);
      // If the object doesn't exist (i.e. it's the first time we get an answer for this) create it
      if (!ass) {
        ass = {
          submitted_for_id: ansObj.student_id,
          answers: [],
          pa_form_id: this.form_id
        };
        // Add the peer assessment to the list
        this.peerAssessments.push(ass);
      }

      // Remove any of the answers with the matching id. This is in case the user went back and
      // updated their answers
      let remaining = ass.answers.filter(a => a.question_id != ansObj.question_id);

      // Create the new answers array
      // if(ansObj.answer !== "") {
      //   ass.answers = [...remaining, {question_id: ansObj.question_id, answer: ansObj.answer}]
      // }
      // else {
      //   // Gotta make sure empty strings are converted to null, so they can be parsed to json
      //   ass.answers = [...remaining, {question_id: ansObj.question_id, answer: null}]
      // }
        ass.answers = [...remaining, {question_id: ansObj.question_id, answer: ansObj.answer}]

    }

  }

  public wizard_OnFinish = () => {
    this.paService.createPeerAssessments(this.peerAssessments);
  };

  public summaryStep_CanGoNext = (): Observable<boolean> => {
    return Observable.of(true);
  };


}
