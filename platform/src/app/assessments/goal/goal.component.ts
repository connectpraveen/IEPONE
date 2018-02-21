import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Skill } from '../../services/assessment/skill/skill';
import { SkillService } from '../../services/assessment/skill/skill.service';
import { Question } from '../../services/assessment/questions/question';
import { TempQuestion } from '../../services/assessment/questions/tempquestion';
import { QuestionsService } from '../../services/assessment/questions/questions.service';
import { GoalService } from '../../services/assessment/goal/goal.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SharedDataService } from '../../shared/shared-data.service';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';

interface QuestionType {
  qtype: string;
  checked: boolean;
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [SkillService, QuestionsService, DatePipe, GoalService, AccountService]
})
export class GoalComponent implements OnInit {
   @ViewChild('skilldrpdwn') skilldrpdwn: ElementRef;
  @ViewChild('goalname') goalname: ElementRef;
  Skills: Skill[];
  Questions: Question[];
  RecByParQues: Question[];
  RecByExpQues: Question[];
  MostUsedQues: Question[];
  TempRecByExperts: TempQuestion[] = [];
  TempMostUsed: TempQuestion[] = [];
  tags = '';
  quesTypes: QuestionType[]= [{'qtype': 'checkbox', 'checked': false},
  {'qtype': 'textbox', 'checked': false},
{'qtype': 'datepicker', 'checked': false},
{'qtype': 'rangepicker', 'checked': false}];
   model: any = {};
  keyword: string;
  TempQuestions: TempQuestion[] = [];
  TempRecByParents: TempQuestion[] = [];
  modalReference: any;
  show= 'none';
  selectedQuestionId = "0";
  selectedQuestion : string;
  mode: string;
  isNewQuestion = false;
  firstTime = false;
  selectedQTypes: string[] = [];
  counter = 0;
  chkboxques = false;
  textques = false;
  dateques = false;
  numques = false;
  date : any;
  valid= true;
  Message = '';
  currentAccountId: Account;
  
  constructor(private skillSer: SkillService, private quesSer: QuestionsService, private modalService: NgbModal,
    private datePipe: DatePipe, private goalSer: GoalService, private shared: SharedDataService,
    private accSer: AccountService) { }

  ngOnInit() {
    this.date = this.datePipe.transform(Date.now(), 'DD-MM-YY');
    this.mode = 'saved';
    this.firstTime = true;
  this.PopulateonLoad();
    this.counter = 0;
  }

  /* function to populate the center section with filtered results */
  PopulateonLoad() {
    let i = 0;
        /* get all skills */
   this.skillSer.getSkills()
            .subscribe((data: Skill[]) => {
              this.Skills = data;
              /* default dropdown selected */
              /*for(i=0;i<this.Skills.length;i++){
                this.tags = this.Skills[i].skill_name;
                this.PopulateRightDrawer();
              }*/

              this.PopulateRightDrawerForReccommendedByParents();
              this.PopulateRightDrawerForReccommendedByExperts();
              this.PopulateRightDrawerForMostUsed();
              },
            error => () => {}, () => {});
  }


  PopulateRightDrawerForReccommendedByParents() {
    let i = 0;
     this.quesSer.selectQuestionsByTags('Reading,ReccommendedByParents')
            .subscribe((data: Question[]) => {
              this.RecByParQues = data;
                this.TempRecByParents = this.CopyToTemp(this.RecByParQues, this.TempRecByParents);
              this.quesSer.selectQuestionsByTags('Writing,ReccommendedByParents')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempRecByParents.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }
              this.quesSer.selectQuestionsByTags('Math,ReccommendedByParents')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempRecByParents.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }},
            error => () => {}, () => {}); },
            error => () => {}, () => {}); },
            error => () => {}, () => {});
  }

   PopulateRightDrawerForReccommendedByExperts() {
    let i = 0;
     this.quesSer.selectQuestionsByTags('Reading,ReccommendedByExperts')
            .subscribe((data: Question[]) => {
              this.RecByExpQues = data;
                this.TempRecByExperts = this.CopyToTemp(this.RecByExpQues, this.TempRecByExperts);
              this.quesSer.selectQuestionsByTags('Writing,ReccommendedByExperts')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempRecByExperts.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }
              this.quesSer.selectQuestionsByTags('Math,ReccommendedByExperts')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempRecByExperts.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }},
            error => () => {}, () => {}); },
            error => () => {}, () => {}); },
            error => () => {}, () => {});
  }

  PopulateRightDrawerForMostUsed() {
    let i = 0;
     this.quesSer.selectQuestionsByTags('Reading,MostUsed')
            .subscribe((data: Question[]) => {
              this.MostUsedQues = data;
                this.TempMostUsed = this.CopyToTemp(this.MostUsedQues, this.TempMostUsed);
              this.quesSer.selectQuestionsByTags('Writing,MostUsed')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempMostUsed.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }
              this.quesSer.selectQuestionsByTags('Math,MostUsed')
            .subscribe((data1: Question[]) => {

              for (i = 0; i < data1.length; i++) {
              this.TempMostUsed.push(new TempQuestion(data1[i].question_id, data1[i].question_type,
       data1[i].question, data1[i].options, data1[i].tags,
       data1[i].goal_id, false));
              }},
            error => () => {}, () => {}); },
            error => () => {}, () => {}); },
            error => () => {}, () => {});
  }


  /* Populate the right drawer based on search */
  PopulateRightDrawer() {
    /* get questions by tags reccommended by parents */
    this.tags = this.tags ;
   this.quesSer.selectQuestionsByTags(this.tags + ',' +  'ReccommendedByParents')
            .subscribe((data: Question[]) => {
              this.RecByParQues = data;
              this.TempRecByParents = this.CopyToTemp(this.RecByParQues, this.TempRecByParents);

              /* get questions by tags reccommended by experts */
              this.quesSer.selectQuestionsByTags(this.tags + ',' +  'ReccommendedByExperts')
            .subscribe((data1: Question[]) => {
              this.RecByExpQues = data1;
              this.TempRecByExperts = this.CopyToTemp(this.RecByExpQues, this.TempRecByExperts);

              /* get questions by tags most used */
              this.quesSer.selectQuestionsByTags(this.tags + ',' +  'MostUsed')
            .subscribe((data2: Question[]) => {
              this.MostUsedQues = data2;
              this.TempMostUsed = this.CopyToTemp(this.MostUsedQues, this.TempMostUsed);
             },
            error => () => {}, () => {});

             },
            error => () => {}, () => {});

             },
            error => () => {}, () => {});
  }


  /* on choosing skill from dropdown */
  onChangeSkill(skill) {
    /* get questions by skill */
    this.tags = skill;
    if (skill === 'Reading,Writing,Math')
      this.PopulateonLoad()
    else
      this.PopulateRightDrawer();
   }

  /* function to create a temporary copy of array */
  CopyToTemp(Org, Temp): TempQuestion[] {
    let i = 0;

    //if(this.firstTime === false){
    /*pop all the elements before inserting */
     for ( i = Temp.length - 1 ; i >= 0; i--) {
       Temp.pop();
      }


    /*push elements into temp array from original */
    for ( i = 0 ; i < Org.length; i++) {
      Temp.push(new TempQuestion(Org[i].question_id, Org[i].question_type, Org[i].question,
      Org[i].options, Org[i].tags, Org[i].goal_id, false));
      }
    return Temp;
    }

  /*when user enters a keyword and searches */
  onSearch() {
    this.keyword = this.model.keyword;
    this.tags = this.keyword;
    /*populate questions based on search keyword*/
    this.PopulateRightDrawer();
    this.skilldrpdwn.nativeElement.selectedIndex = 0;
  }

  /*delete the selected questions*/
  onDeleteSelected() {
    let i = 0; 
   for (i = 0; i < this.TempQuestions.length; i++) {
     if (this.TempQuestions[i].checked === true){
          this.TempQuestions.splice(i, 1);
          i = i - 1;
     }
    }
  }

  updateQuestionType(event) {
    let i = 0;
   for (i = 0; i < this.quesTypes.length; i++) {
     if (this.quesTypes[i].qtype === event.target.value)
        this.quesTypes[i].checked = event.target.checked;
     switch (event.target.value) {
       case 'checkbox': this.chkboxques = true; break;
       case 'textbox' : this.textques = true; break;
       case 'datepicker': this.dateques = true; break;
       case 'rangepicker': this.numques = true; break;
     }
    }
  }
  
  resetQuestionType() {
    let i = 0;
   for (i = this.selectedQTypes.length; i >= 0; i--) {
     this.selectedQTypes.pop();
    }
    for (i = 0; i < this.quesTypes.length; i++) {
    
       this.quesTypes[i].checked = false;
    this.chkboxques = true; 
      this.textques = true; 
       this.dateques = true; 
        this.numques = true; 
    }
  }
  

  /* update array when checkbox changes state */
  updateCheckedOptions(event) {
    let i = 0;
   for (i = 0; i < this.TempQuestions.length; i++) {
     if (this.TempQuestions[i].question_id === event.target.value)
        this.TempQuestions[i].checked = event.target.checked;
    }
}

   /* update array when checkbox changes state */
   updateCheckedRecByParents(event) {
    let i = 0; 
   for (i = 0; i < this.TempRecByParents.length; i++) {
     if (this.TempRecByParents[i].question_id === event.target.value)
        this.TempRecByParents[i].checked = event.target.checked;
    }
}

  /* update array when checkbox changes state */
   updateCheckedRecByExperts(event) {
    let i = 0;
   for (i = 0; i < this.TempRecByExperts.length; i++) {
     if (this.TempRecByExperts[i].question_id === event.target.value)
        this.TempRecByExperts[i].checked = event.target.checked;
    }
}

  /* update array when checkbox changes state */
   updateCheckedMostUsed(event) {
    let i = 0;
   for (i = 0; i < this.TempMostUsed.length; i++) {
     if (this.TempMostUsed[i].question_id === event.target.value)
        this.TempMostUsed[i].checked = event.target.checked;
    }
}



  /* add questions to goal from right drawer */
  onClickAddToGoal() {
      this.valid = true;
       //let temp: number[] = [];
       let i = 0;let j=0;
    /* add questions from reccommended by parents to my goal */
   for (i = 0; i < this.TempRecByParents.length; i++) {
     if (this.TempRecByParents[i].checked === true) {
     this.counter = this.counter + 1;
     this.TempQuestions.push(new TempQuestion(this.counter.toString(), this.TempRecByParents[i].question_type,
       this.TempRecByParents[i].question, this.TempRecByParents[i].options, this.TempRecByParents[i].tags,
       this.TempRecByParents[i].goal_id, false));
      //temp.push(i);
      this.TempRecByParents.splice(i, 1);
       i = i - 1;
     //this.TempRecByParents[i].checked = false;
     }
     /*for(i=0,j=0;i<temp.length;i++,j++){
       this.TempRecByParents.splice(i,1);
              }*/
    }

    /* add questions from reccommended by experts to my goal */
   for (i = 0; i < this.TempRecByExperts.length; i++) {
     if (this.TempRecByExperts[i].checked === true) {
      this.counter = this.counter + 1;
     this.TempQuestions.push(new TempQuestion(this.counter.toString(), this.TempRecByExperts[i].question_type,
       this.TempRecByExperts[i].question, this.TempRecByExperts[i].options, this.TempRecByExperts[i].tags,
       this.TempRecByExperts[i].goal_id, false));

     //this.TempRecByExperts[i].checked = false;
      this.TempRecByExperts.splice(i, 1);
       i = i - 1;
    }}

    /* add questions from most used to my goal */
   for (i = 0; i < this.TempMostUsed.length; i++) {
     if (this.TempMostUsed[i].checked === true) {

       this.counter = this.counter + 1;
     this.TempQuestions.push(new TempQuestion(this.counter.toString(), this.TempMostUsed[i].question_type,
       this.TempMostUsed[i].question, this.TempMostUsed[i].options, this.TempMostUsed[i].tags,
       this.TempMostUsed[i].goal_id, false));

      this.TempMostUsed.splice(i, 1);
       i = i - 1;
     //this.TempMostUsed[i].checked = false;
    }}
  }

  openWindow(id, ques) {
    if (this.selectedQuestionId === id)
      this.selectedQuestionId = "0";
    else {
    this.mode = 'saved';
    this.selectedQuestionId = id;
    this.selectedQuestion = ques; }
  }

  onEdit() {
     this.chkboxques = this.textques = this.dateques = this.numques = false;
    this.mode = 'edit';
    
  }
  
  open(content, event, options) {
        this.modalReference = this.modalService.open(content, options);  
  }
  

  onSave() {debugger;
    let i = 0;

   /* for(i=0;i<this.TempQuestions.length;i++)
      if(this.TempQuestions[i].question_id === this.selectedQuestionId)
        this.TempQuestions.splice(i, 1);*/

    for (i = 0; i < this.quesTypes.length; i++) {
      if (this.quesTypes[i].checked) {
        this.selectedQTypes.push(this.quesTypes[i].qtype);
        if (i === 0) {
        for (i = 0; i < this.TempQuestions.length; i++)
          if (this.TempQuestions[i].question_id === this.selectedQuestionId) {
            this.TempQuestions[i].question_type = this.quesTypes[i].qtype;
            this.TempQuestions[i].question = this.selectedQuestion;
          }}
        else {
          this.counter = this.counter + 1;
            this.TempQuestions.push(new TempQuestion((this.counter).toString(), this.quesTypes[i].qtype,
              this.selectedQuestion, null, null, '', false)); debugger;
        }
      }
    }
    this.mode = 'saved';
    this.chkboxques = this.textques = this.dateques = this.numques = false;
  }
  
  onSaveQuestion() {debugger;
     let i = 0;
    for (i = 0; i < this.quesTypes.length; i++) {
      if (this.quesTypes[i].checked) {
        this.selectedQTypes.push(this.quesTypes[i].qtype);
          this.counter = this.counter + 1;
            this.TempQuestions.push(new TempQuestion((this.counter).toString(), this.quesTypes[i].qtype,
              this.model.newQuestion, null, null, '', false));   
      }
    }
    //this.mode = 'saved';
    this.resetQuestionType();
    this.chkboxques = this.textques = this.dateques = this.numques = false;
    this.model.newQuestion='';
    this.modalReference.close();
  }

  onChangeQues(ques) {
    this.selectedQuestion = ques;
    this.isNewQuestion = true;
  }

  onCancel() {
    this.mode = 'saved';
    this.chkboxques = this.textques = this.dateques = this.numques = false;
  }

  onCancelGoal() {
    let i = 0;
    for (i = this.TempQuestions.length; i >= 0; i--)
      this.TempQuestions.pop();
  }

  onComplete() {
    let goal_id = ''; let i = 0;
    if (this.TempQuestions.length === 0) {
       this.Message = 'No questions added to your Goal!';
      this.valid = false;
    }
    else {
    if (this.goalname.nativeElement.value === '') {
      this.Message = 'Please enter name for your Goal!';
      this.valid = false;
    }
    else {
      this.valid = true;
       this.accSer.getAccount(this.shared.getUserEmail()).subscribe((data: Account) => {
        this.currentAccountId = data;
      this.goalSer.addNewGoal(this.goalname.nativeElement.value, this.currentAccountId.account_id).subscribe((res: string) =>  {
            goal_id = res;
        
       debugger;
            this.Message = 'Your goal has been successfully added!'; this.valid = false;   
        for (i = 0; i < this.TempQuestions.length; i++) {
          this.TempQuestions[i].question = this.TempQuestions[i].question.replace('?', ' ');
            this.quesSer.addQuestion(this.TempQuestions[i].question_id, this.TempQuestions[i].question_type,
              this.TempQuestions[i].question, this.TempQuestions[i].options, this.TempQuestions[i].tags,
              goal_id.toString()).subscribe(res =>  { }, error => () => { }, () => {});
        }
     
         }, error => () => { }, () => {});
         
          }, error => () => { }, () => {});
      }
    }
  }
}
