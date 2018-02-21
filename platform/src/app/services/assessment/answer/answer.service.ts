import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class AnswerService {
 headers: any;
  options: RequestOptions;
  private baseUrl;
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
  
    /* insert user into Subscriber */
  insertAnswer(ques_id,goal_id,answer,pic,comment,video) {
     return this._http.get(this.baseUrl + 'addAnswer/'
      + ques_id + '/' + goal_id + '/' + answer + '/' + pic + '/' + comment + '/' + video  ).map(data => {
             return data; });
  }

}
