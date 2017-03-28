import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav-component/sidenav.component';
import { HomeComponent } from './home-component/home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '../../shared/Directives/sharedDirectivesModule';
import { PaFeedItemComponent } from './assessment/pa-feed-item-component/pa-feed-item.component';
import { PaFeedComponent } from './assessment/pa-feed-component/pa-feed.component';
import { UnitListComponent } from './unit/unit-list-component/unit-list.component';
import { UnitListItemComponent } from './unit/unit-list-item-component/unit-list-item.component';
import { ProjectEnrollmentComponent } from './project/project-enrollment-component/project-enrollment.component';
import { PeerAssessmentComponent } from './assessment/peer-assessment-component/peer-assessment.component';
import { PeerAssessmentQuestionComponent } from './assessment/questions/peer-assessment-question-component/peer-assessment-question.component';
import { ProfileSidebarComponent } from './profile-sidebar-component/profile-sidebar.component';
import { ProjectDetailsComponent } from './project/project-details-component/project-details.component';
import { ProjectListComponent } from './project/project-list-component/project-list.component';
import { ProjectListItemComponent } from './project/project-list-item-component/project-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogsComponent } from './logs/logs-component/logs.component';
import { LogsDisplayComponent } from './logs/logs-display-component/logs-display.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragulaModule } from 'ng2-dragula';
import { LogPreviewComponent } from './logs/log-preview-component/log-preview.component';
import { CreateLogComponent } from './logs/create-log-component/create-log.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { RangeQuestionComponent } from './assessment/questions/range-question-component/range-question.component';
import { UnknownQuestionComponent } from './assessment/questions/unknown-question.component';
import { TextQuestionComponent } from './assessment/questions/text-question-component/text-question.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    SharedDirectivesModule,
    NgxDatatableModule,
    DragulaModule,
    NgxMyDatePickerModule
  ],
  declarations: [
    SidenavComponent,
    HomeComponent,
    PaFeedComponent,
    PaFeedItemComponent,
    UnitListComponent,
    UnitListItemComponent,
    ProjectEnrollmentComponent,
    PeerAssessmentComponent,
    PeerAssessmentQuestionComponent,
    ProfileSidebarComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    ProjectListItemComponent,
    LogsComponent,
    LogsDisplayComponent,
    LogPreviewComponent,
    CreateLogComponent,
    RangeQuestionComponent,
    UnknownQuestionComponent,
    TextQuestionComponent
  ],
  entryComponents: [
    RangeQuestionComponent,
    UnknownQuestionComponent,
    TextQuestionComponent
  ],
  providers: [],
  exports: [
    SidenavComponent,
    ProfileSidebarComponent
  ]
})
export class StudentModule {

}
