import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';
import { SharedDataService } from '../../shared/shared-data.service';
import {ActivatedRoute, Router, UrlSegment, ParamMap } from '@angular/router';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login_page/login/login.service';
import { Login } from '../../services/login_page/login/login';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService,LoginService]
})
export class AccountComponent implements OnInit {

 
  verCode: string;
  sentVerCode: string;
   model: any = {};
  @ViewChild('hiddenEmailBtn') hiddenEmailBtn: ElementRef;
  @ViewChild('hiddenBtn') hiddenBtn: ElementRef;
  currentAccount: Account;
  modalReference: any;
  accountVerified = false;//flag to find if account is already verified  
  email : string;
  emailVerified = 'false';
  phoneVerified = 'false';
  phoneSaved = false;
  showPwdMessage = false;
  pwdMessage:string;
  hideRepeat = true;
  showLoginDetails = false;
  loginDetails : Login[];
  enableSave = false;
  pwdType='password';
  hideEmail = true;
  emailSaved= false;
  emlMsg:string;
  loginCount=0;reverse = true;order = 'last_login';
  constructor(private accser: AccountService, private shared: SharedDataService, private router: Router,
            private logSer: LoginService, private modalService: NgbModal) { }

  ngOnInit() {
    this.model.email = this.shared.getUserEmail();
   this.accser.getAccount(this.model.email)
            .subscribe((data:Account) => {
               this.currentAccount = data;
               this.emailVerified =  data.email_verified.toString();  
              this.model.phone =  data.phone_number;
              this.phoneVerified = data.phone_verified.toString();
              this.model.pwd = data.pwd;
              
              /* fetch user login details */
              this.logSer.getLoginDetails(this.currentAccount.account_id)
                  .subscribe((data:Login[]) => {this.loginDetails = data;
              this.loginCount = data.length;
                           }, error => () => { }, () => {});
            }, error => () => { }, () => {});
    
   /* this.accser.getPhone(this.model.email)
            .subscribe((data:Account) => { this.model.phone =  data.phone_number;
             this.phoneVerified = data.phone_verified.toString();
             }, error => () => { }, () => {});*/

 }
  
    onSubscribe() {
    this.router.navigate(['subscribe']);    
  }
  
  
  
  open(content) {
        this.modalReference = this.modalService.open(content);  
  }
  
  
  onVerifyEmail(){
     /* If user enters email id, send a verification email with a code */
     this.accser.sendEmail(this.model.email)
            .subscribe((data: string) => {
              this.shared.saveVerificationLink(data);  
              let el: HTMLElement = this.hiddenEmailBtn.nativeElement as HTMLElement;
             el.click();        
            }, error => () => { }, () => {});
  }
  
  onVerifyPhone(){
     /* If user enters email id, send a verification email with a code */
     this.accser.sendSMS(this.model.phone)
            .subscribe((data: string) => {
              this.shared.saveVerificationLink(data);  
              let el: HTMLElement = this.hiddenBtn.nativeElement as HTMLElement;
             el.click();        
            }, error => () => { }, () => {});
  }
  
onSave(){
     /* If user enters email id, send a verification email with a code */
     this.accser.savePhone(this.currentAccount.account_id,this.model.phone)
            .subscribe((data:number) => { 
            if(data>0){  
            this.phoneSaved = true;
    this.phoneVerified = 'false';
            this.enableSave = false;}}, error => () => { }, () => {});
  }
  
  /* submit of Email verify */
  onClickSubmit() {
   this.sentVerCode = this.shared.getVerLink();
    /* Check if verification code entered is correct */
    if (this.verCode.toString() === this.sentVerCode.toString()) {
      this.emailVerified = 'true';
      this.accser.verifyEmail(this.model.email)
            .subscribe((data) => { }, error => () => { }, () => {});
    }
  }
  
  /* submit of Email verify */
  onSubmit() {
   this.sentVerCode = this.shared.getVerLink();
    /* Check if verification code entered is correct */
    if (this.verCode.toString() === this.sentVerCode.toString()) {
      this.phoneVerified = 'true';
      this.accser.verifyPhone(this.model.phone)
            .subscribe((data) => { }, error => () => { }, () => {});
    }
  }
  
  
   onVerCodeChange(event){
    this.verCode = event.target.value;
    this.accountVerified = false;
  }
  
  
  onSaveChangedPwd(){
    if(this.model.pwd=== this.model.rptpwd){
      this.showPwdMessage = true;
      this.pwdMessage = 'Your password has been changed successfully!!';
      this.hideRepeat = true;
      this.accser.saveNewPwd(this.model.email,this.model.pwd)
            .subscribe((data) => { }, error => () => { }, () => {});
    }else
      {
      this.pwdMessage = 'The two passwords dont match !'
      this.showPwdMessage = true;
    }
  }
  
   onSaveChangedEmail(){
    if(this.shared.getUserEmail() === this.model.email){
      this.emlMsg = 'Please enter a different Email ID!';
      this.emailSaved = true;
    }else{
     this.accser.saveNewEmail(this.shared.getUserEmail(),this.model.email)
            .subscribe((data:number) => {
            if(data === 2){
                this.emlMsg = 'This email is already registered with us. Please enter a different email id! ';
                this.emailSaved = true;
                this.model.email = this.shared.getUserEmail();
              } else if(data >0){
              this.shared.saveuserEmail(this.model.email);
              this.emailVerified = 'false';
              this.emlMsg = 'Email has been updated';
              this.emailSaved = true; }
            }, error => () => { }, () => {});
  }}
  
  onCancel(){
    this.hideRepeat = true;
  }
  
  onShowPlatformLogin(e: HTMLInputElement){debugger;
    if(e.checked)
      this.showLoginDetails = true;
    else
      this.showLoginDetails = false;
  }
}
