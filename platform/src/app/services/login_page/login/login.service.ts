import { Injectable } from '@angular/core';
import { Login } from './login';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { SharedDataService } from '../../../shared/shared-data.service';

@Injectable()
export class LoginService {
  private servletUrl;
   constructor(private http: Http, private _http: HttpClient, private shareSer: SharedDataService) {
    this.servletUrl = shareSer.getServletUrl();
}

  
  /* add login details to Platform login history table */
  addLoginDetails(id, ip, session, permission, datetime)  {
    let login = {'account_id': id, 'ip_address': ip, 'session_val': session, 'permission': permission,
      'last_login': datetime, 'action': 'add'};
    return this._http.get<Boolean>(this.servletUrl + 'GetLogin?' + JSON.stringify(login) ).map(data => {
             return <Boolean>data; });
  }
  
  /* Register account details */
   insertAccount(email, password): Observable<Account> {
      let acc = {'email': email, 'password': password, 'action': 'register'};
     return this._http.get<Account>(this.servletUrl + 'GetAccount?' + JSON.stringify(acc) ).map(data => {
             return <Account>data; });
  }
  
  /* fetch user login details */
   getLoginDetails(id): Observable<Account[]> {
      let login = {'account_id': id, 'ip_address': '', 'session_val': '', 'permission': '',
      'last_login': '', 'action': 'fetch'};
     return this._http.get<Login[]>(this.servletUrl + 'GetLogin?' + JSON.stringify(login)).map(data => {
             return <Login[]>data; });
  }
  
  getIpCliente(): Observable<string> {
      return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK') // ...using post request '
      .map((res: Response) => {console.log('res ', res);
                              console.log('res.json() ', res.text());
                              console.log('parseado  stringify ', JSON.stringify(res.text()));
                              let ipVar = res.text();
                              let num = ipVar.indexOf(":");
                              let num2 = ipVar.indexOf("\"});");
                              ipVar = ipVar.slice(num + 2, num2);
                              console.log('ipVar -- ', ipVar);
                              return ipVar});
  
}
}
