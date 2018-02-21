import { Injectable } from '@angular/core';
import { Account } from './account';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class AccountService {
  private servletUrl;
  constructor(private http: Http, private _http: HttpClient, private shareSer: SharedDataService) {
    this.servletUrl = shareSer.getServletUrl();
  }
  
    /* verify email address */
  verifyEmail(email) {
    let acc = {'email': email, 'password': '', 'action': 'verifyemail'};
     return this._http.get(this.servletUrl + 'GetAccount?' + JSON.stringify(acc));
  }
  
  /* verify phone number */
  verifyPhone(phone) {
     let acc = {'email': '', 'phone_number':phone, 'password': '', 'action': 'verifyphone'};
     return this._http.get(this.servletUrl + 'GetAccount?' + JSON.stringify(acc));
  }
  
  /* Register account details */
   insertAccount(email, password): Observable<Account> {
      let acc = {'email': email, 'password': password, 'action': 'register'};
     return this._http.get<Account>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc) ).map(data => {
             return <Account>data; });
  }

  
    /* Sign in to account*/
  signInAccount(email, password): Observable<number> {
    let acc = {'email': email, 'password': password, 'action': 'signin'};
   return this._http.get<number>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)).map(data => {
             return <number>data; });
  }
  
 
   /* get the account details given email id*/
  getAccount(email): Observable<Account> {
     let acc = {'email': email, 'password': '', 'action': 'find'};
    return this._http.get<Account>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc))
      .map(data => {debugger;
            return <Account> data; });
  }


    /* Verify the user by sending an email to his id */
   sendEmail(email): Observable<string> {
     let acc = {'email': email, 'password': '', 'action': 'sendemail'};
    return this._http.get<string>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)).map(data => {
             return <string>data; });
  }
  

  
  /* Verify the user by sending an SMS to his phone number */
   sendSMS(phone): Observable<String> {
     let acc = {'email': '', 'password': '', 'phone_number': phone, 'action': 'sendsms'};
    return this._http.get<string>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)).map(data => {
             return <string>data; });
  }
  
  /* function to update the phone number */
    savePhone(id, phone) {
     let acc = {'email': '', 'password': '', 'phone_number': phone,'account_id': id , 'action': 'savephone'};
     return this._http.get<number>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)) .map(data => {
            return <number> data; });
  }

  /* function to update the password */
  saveNewPwd(email, pwd) {
    let acc = {'email': email, 'password': pwd, 'action': 'updatepassword'};
     return this._http.get(this.servletUrl + 'GetAccount?' + JSON.stringify(acc));
  }
  
  /* function to update the email id */
   saveNewEmail(oldemail, newemail): Observable<number> {
     let acc = {'email': oldemail, 'password': '','newemail':newemail ,'action': 'updateemail'};
     return this._http.get<number>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)).map(data => {
             return <number>data; });
  }
  
   /* insert user into Subscriber */
  signOutAccount(id): Observable<number> {
      let acc = {'email': '', 'password': '' ,'account_id': id ,'action': 'signout'};
     return this._http.get<number>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc)).map(data => {
             return <number>data; });
  }
  
  
}
