import { Injectable } from '@angular/core';
import { Service } from './service';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class ServicesService {
i:number;
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
  
  /* gets all the services */
  getServices(): Observable<Service[]>  {
     return this._http.get<Service[]>(this.baseUrl + 'selectAllServices')
      .map(data => {
             return <Service[]>data; });
  }
     
  /* get the service given service id */
  getServiceById(ser_id, plan_id): Observable<Service> {
    return this._http.get<Service>(this.baseUrl + 'selectServiceById/' + ser_id + '/' + plan_id)
      .map(data => {
            return <Service> data; });
  }  
}
