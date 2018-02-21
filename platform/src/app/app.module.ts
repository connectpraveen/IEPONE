import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountComponent } from './loginpage/account/account.component';
import { SharedDataService } from './shared/shared-data.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ClassifyimagesComponent } from './classifyimages/classifyimages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TabModule} from 'angular-tabs-component';
import { AccountManagementComponent } from './account_management/accountmanagement/account-management.component';
import { LoginComponent } from './loginpage/login/login.component';
import { SubscriptionComponent } from './account_management/subscription/subscription/subscription.component';
import { OrderModule } from 'ngx-order-pipe';
import { GoalComponent } from './assessments/goal/goal.component';
//import { NgDatepickerModule } from 'ng2-datepicker';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ProfileComponent } from './account_management/profile/profile.component';
import { AssessmentComponent } from './assessments/assessment/assessment.component';
import { OrchestrationComponent } from './orchestrations/orchestration/orchestration.component';
import { MessageComponent } from './orchestrations/message/message.component';
import { DeviceComponent } from './account_management/device/device.component';
import { AnswerAssessmentComponent } from './assessments/answer-assessment/answer-assessment.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { Ng4FilesModule } from 'angular4-files-upload';
import { ReportsHomeComponent } from './reports/reports-home/reports-home.component';
//import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from './header/header.component';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
//import { DeviceDetectorModule } from 'ngx-device-detector';
 import { Ng2DeviceDetectorModule } from 'ng2-device-detector' ; 
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ClassifyimagesComponent,
    DashboardComponent,
    AccountManagementComponent,
    LoginComponent,
    SubscriptionComponent,
    GoalComponent,
    ProfileComponent,
    AssessmentComponent,
    OrchestrationComponent,
    MessageComponent,
    DeviceComponent,
    AnswerAssessmentComponent,
    ReportsHomeComponent,
    HeaderComponent
   ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpModule, NgbModule.forRoot(), HttpClientModule,
    OrderModule, NgDatepickerModule , ImageUploadModule.forRoot(), Ng4FilesModule, MatSliderModule,//BsDropdownModule.forRoot(),
   // NgxIntlTelInputModule,
   Ng2DeviceDetectorModule.forRoot()
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
