import { Injectable } from '@angular/core';
import { Message } from './message';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { SharedDataService } from '../../shared/shared-data.service';

@Injectable()
export class MessageService {

   headers: any;
  options: RequestOptions;
  private baseUrl;
  
  MESSAGES: Message[] = [{'message_id':'1','email_id':'abc@gmail.com','message':'This is the first message'},
  {'message_id':'2','email_id':'def@gmail.com','message':'This is the second message'},
{'message_id':'3','email_id':'ghi@gmail.com','message':'This is the third message'}];
  
  
  constructor(private http: Http, private _http: HttpClient, private shareSer: SharedDataService) {
    this.baseUrl = shareSer.getApiUrl();  
  this.headers = new Headers();
   this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, ' +
      'Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
     this.headers.append( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    this.options = new RequestOptions({ headers: this.headers }); }
  
  getMessages(): Message[]{
    return this.MESSAGES;
  }
}
