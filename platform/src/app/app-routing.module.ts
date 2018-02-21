import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './loginpage/account/account.component';
import { ClassifyimagesComponent } from './classifyimages/classifyimages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountManagementComponent } from './account_management/accountmanagement/account-management.component';
import { LoginComponent } from './loginpage/login/login.component';
import { DeviceComponent} from './account_management/device/device.component'
import { ProfileComponent} from './account_management/profile/profile.component'
import { SubscriptionComponent } from './account_management/subscription/subscription/subscription.component';
import { GoalComponent } from './assessments/goal/goal.component';
import { AssessmentComponent } from './assessments/assessment/assessment.component';
import { OrchestrationComponent } from './orchestrations/orchestration/orchestration.component';
import { MessageComponent } from './orchestrations/message/message.component';
//import { QuizComponent } from './quiz/quiz.component';
import { AnswerAssessmentComponent } from './assessments/answer-assessment/answer-assessment.component';
import { ReportsHomeComponent } from './reports/reports-home/reports-home.component';
//import { NewGoalComponent } from './assessments/new-goal/new-goal.component';

const routes: Routes = [{ path: '',   redirectTo: 'login', pathMatch: 'full' },
{path: 'login', component: LoginComponent},
{path: 'account-management', component: AccountComponent},
{path: 'account-management/account', component: AccountComponent},
{path: 'account-management/subscription', component: SubscriptionComponent},
{path: 'account-management/device', component: DeviceComponent},
{path: 'account-management/profile', component: ProfileComponent},
{path: 'classify-images', component: ClassifyimagesComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'assessment', component: AssessmentComponent},
{path: 'goal',component: GoalComponent},
{path: 'orchestration',component: OrchestrationComponent},
{path: 'message', component: MessageComponent},
{path: 'assessment/:id', component: AnswerAssessmentComponent},
{path: 'reports', component: ReportsHomeComponent}
//{path: 'new-goal',component: NewGoalComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
