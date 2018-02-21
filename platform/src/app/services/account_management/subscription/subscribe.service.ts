import { Injectable } from '@angular/core';
import { Subscription } from './subscription';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class SubscribeService {
 headers: any;
  options: RequestOptions;
  private baseUrl;
  subs: Subscription;
  i: number;
  constructor(private http: Http, private _http: HttpClient, private shareSer: SharedDataService ) { 
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

  getIfSubscribed(id): Observable<Subscription>{
    return this._http.get<Subscription>(this.baseUrl + 'getIfSubscribed/' + id)
      .map(data => {
            return <Subscription> data; });
  } 
  
  getallSubscriptions(id): Observable<Subscription[]>{
    return this._http.get<Subscription[]>(this.baseUrl + 'getallSubscriptions/' + id)
      .map(data => {
            return <Subscription[]> data; });
  } 
  
  
  updateSubscription(id,subsCode):Observable<number>{
    return this._http.get<number>(this.baseUrl + 'updateSubscription/' + id + '/' + subsCode)
      .map(data => {
            return  <number>data; });
  }
  
  insertSubscription(account_id,service_id,quantity):Observable<String[]>{
    return this._http.get<String[]>(this.baseUrl + 'insertSubscription/' + account_id + '/' + service_id+'/'+quantity)
      .map(data => {
            return <String[]>data; });
  }
}
