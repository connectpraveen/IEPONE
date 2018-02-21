import { Injectable } from '@angular/core';
import { Image } from '../imageclassification/image';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map'
import { SharedDataService } from '../../shared/shared-data.service';

@Injectable()
export class ClassifyService {

  IMAGES: Image[] = [{'image_id': '1', 'image_url': 'image1.jpg', 'classified': false},
  {'image_id': '2', 'image_url': 'image2.jpg', 'classified': false},
{'image_id': '3', 'image_url': 'image3.jpg', 'classified': false},
{'image_id': '4', 'image_url': 'image4.jpg', 'classified': false},
{'image_id': '5', 'image_url': 'image5.jpg', 'classified': false},
{'image_id': '6', 'image_url': 'image6.jpg', 'classified': false},
{'image_id': '7', 'image_url': 'image7.jpg', 'classified': false},
{'image_id': '8', 'image_url': 'image8.jpg', 'classified': false},
{'image_id': '9', 'image_url': 'image9.jpg', 'classified': false},
{'image_id': '10', 'image_url': 'image10.jpg', 'classified': false}];

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

   /* gets all the Images */
  getImages(): Image[]  {
    return this.IMAGES;
    /* return this._http.get<Image[]>(this.baseUrl + 'selectAllImages')
      .map(data => {
             return <Image[]>data; });*/
  }

  addImages(images) {
    return this._http.get(this.baseUrl +
       'updateClassified/' +  images );
  }
}
