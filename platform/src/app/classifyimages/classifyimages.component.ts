import { Component, OnInit } from '@angular/core';
import { Image } from './../services/imageclassification/image';
import { ClassifyService } from './../services/imageclassification/classify.service';

@Component({
  selector: 'app-classifyimages',
  templateUrl: './classifyimages.component.html',
  styleUrls: ['./classifyimages.component.css'],
  providers:[ClassifyService]
})
export class ClassifyimagesComponent implements OnInit {

  Images: Image[];
  selectedImages: string[] =[];
  showMsg=true;
  firstTime = true;
  constructor(private clasSer: ClassifyService) { }

  ngOnInit() {
    this.Images = this.clasSer.getImages();
  }

  onClick(e,url){
    this.selectedImages.push(url);
   e.target.style.border = '2px solid red';
  }
  
  onSave(){
    if(this.selectedImages.length>0){
    this.showMsg=false;
     this.clasSer.addImages(this.selectedImages)
            .subscribe((data) => { },
            error => () => {},() => {});
    }
  }
  
  onCancel(){
    let i : number ;
    for(i=this.selectedImages.length-1;i>=0;i--)
      this.selectedImages.pop();
 
  
  for(i=0;i<this.Images.length;i++)
    this.Images[i].classified=false;
   
   this.firstTime = true;
    this.showMsg = true;
   }  
  
}

