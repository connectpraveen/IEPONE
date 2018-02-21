import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/assessment/questions/questions.service';
import { Question } from '../../services/assessment/questions/question';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ng4FilesStatus, Ng4FilesSelected,Ng4FilesService, Ng4FilesConfig } from 'angular4-files-upload';
import { AnswerService } from '../../services/assessment/answer/answer.service';

@Component({
  selector: 'app-answer-assessment',
  templateUrl: './answer-assessment.component.html',
  styleUrls: ['./answer-assessment.component.css'],
  providers:[QuestionsService,AnswerService]
})
export class AnswerAssessmentComponent implements OnInit {
   
questions:Question[];
  currentQuestion = 0;
  picChecked= false;
  comChecked=false;
  videoChecked=false;
  public selectedFiles;
  model: any= { };
  pic='null';
  video='null';
  comment='null';
  answer='';
  showMsg = false;
  private configImage: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'jpeg'],
    maxFilesCount: 5,
    totalFilesSize: 101200000
  };
  
private configVideo: Ng4FilesConfig = {
    acceptExtensions: ['mp4', 'avi'],
    maxFilesCount: 1
  }; 
  constructor(private quesSer:QuestionsService, private route: ActivatedRoute,
  private router: Router,private ng4FilesService: Ng4FilesService, private ansSer : AnswerService) { }
 

  ngOnInit() {
     let id = this.route.snapshot.paramMap.get('id');
    this.quesSer.GetGoalQuestions(id).subscribe((res:Question[])=>{
      this.questions = res;
    });
  //this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
    this.ng4FilesService.addConfig(this.configVideo, 'my-video-config'); 
  }
  
  onNext(){
    this.currentQuestion = this.currentQuestion + 1;
    if(this.currentQuestion === this.questions.length)
      this.currentQuestion = 0;
  this.clear();
  }
  
  onPrev(){
    if(this.currentQuestion === 0)
      this.currentQuestion = this.questions.length;
    this.currentQuestion = this.currentQuestion - 1;  
    this.clear();
  }

 clear(){
   this.picChecked = this.videoChecked = this.comChecked =false;
   this.answer = this.pic = this.comment = this.video = 'null';
   this.showMsg = false;
 }
  
  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  } 
  
  onUploadFinished(event){
   this.pic=event.file.name;    
  }
  
 onChecked(e){
   let checked=[];let i=0;
   if(e.target.checked)
     checked.push(e.target.value)
   else{
     for(i=0;i<checked.length;i++)
      if(checked[i] === e.target.value)
        checked.splice(i,1);
   }
   this.answer = checked.toString();
 }
  onSelectRadio(e){
    this.answer = e.target.value;
  }
  
  onSelect(e){
    this.answer = e.target.value;
  }
  
  onSave(q){this.showMsg = true;
    this.ansSer.insertAnswer(q.question_id,q.goal_id,this.answer,this.pic,this.model.comment,this.selectedFiles)
            .subscribe((data) => { }, error => () => {}, () => {});
  }
  
  onEnterNumber(e){
    this.answer = this.model.number;
  }
  
  onEnterText(e){
    this.answer = this.model.text;
  }
}
