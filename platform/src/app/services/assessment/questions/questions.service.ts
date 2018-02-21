import { Injectable } from '@angular/core';
import { Question } from './question';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class QuestionsService {

  i: number;
  headers: any;
  options: RequestOptions;
  private baseUrl = 'http://localhost:9000/';
  
  constructor(private http: Http, private _http: HttpClient) { this.headers = new Headers();
   this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, ' +
      'Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
     this.headers.append( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    this.options = new RequestOptions({ headers: this.headers }); }
  
   /* gets all the skills */
  selectQuestionsBySkill(skill): Observable<Question[]>  {
     return this._http.get<Question[]>(this.baseUrl + 'selectQuestionsBySkill/' + skill)
      .map(data => {
             return <Question[]>data; });
  }

   /* gets all the skills */
  selectQuestionsByTags(tags): Observable<Question[]>  {
     return this._http.get<Question[]>(this.baseUrl + 'selectQuestionsByTags/' + tags)
      .map(data => {
             return <Question[]>data; });
  }
  
  /*add all the questions*/
 addQuestion(question_id, question_type, question, options, tags, goal_id) {
    return this._http.get(this.baseUrl +
       'addQuestions/' + question_id + '/' + question_type + '/' + question + '/' + options + '/' + tags + '/' + goal_id);
  }
  
  /* gets all the skills */
  GetGoalQuestions(goal): Observable<Question[]>  {
     return this._http.get<Question[]>(this.baseUrl + 'getQuestions/' + goal)
      .map(data => {
             return <Question[]>data; });
  }

}
