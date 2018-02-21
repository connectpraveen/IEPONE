import { Injectable } from '@angular/core';
import { Reports } from '../reports/reports';
import { SharedDataService } from '../../shared/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsService {
 private baseUrl;
  constructor(private _http: HttpClient,private shareSer: SharedDataService) {
  this.baseUrl = shareSer.getApiUrl(); 
   }
 
 /* get all payment methods*/
  getAllData(id): Observable<Reports[]>{
     return this._http.get<Reports[]>(this.baseUrl + 'getReports/'+ id)
      .map(data => {  debugger;
             return <Reports[]>data; });
  }
}
