export class TempQuestion {
question_id: string;
question_type: string; // Multiple choice, input, radio button, check box
question: string;
options: string[];
tags: string[];
goal_id: string; // Foreign key from Template
checked: boolean;
   constructor(question_id: string,question_type: string,question: string,options: string[],tags: string[],
    goal_id: string,checked: boolean){
    this.question_id = question_id;
     this.question_type = question_type;
     this.question = question;
     this.options = options;
     this.tags = tags;
     this.goal_id = goal_id;
     this.checked = checked;
  }
}

