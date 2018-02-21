import { Injectable } from '@angular/core';
import { Device } from './device';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class DeviceService {
  private servletUrl;

  constructor(private http: Http, private _http: HttpClient, private shareSer: SharedDataService) { 
   this.servletUrl = shareSer.getServletUrl();
   }
  
    /* check if the user is logged in first time */
  getDevices(id): Observable<Device[]>{
    let device = {'account_id': id, 'action': 'fetch'};
    return this._http.get<Device[]>(this.servletUrl + 'GetDevice?'+ JSON.stringify(device) )
      .map(data => {
            return <Device[]> data;});
  }
  
   /* add Device info to Device table */
  insertDevice(type,status,last_sync,last_login,account_id): Observable<Device> {
    let device = {'type': type, 'status': status, 'last_sync': last_sync, 'last_login': last_login,
      'account_id': account_id, 'action': 'add'};
   return this._http.get<Account>(this.servletUrl + 'GetDevice?'+ JSON.stringify(device) ).map(data => {
             return <Account>data; });
  }

}
