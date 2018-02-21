export class Question {
question_id: string;
question_type: string; // Multiple choice, input, radio button, check box
question: string;
options: string[];
tags: string[];
goal_id: string; // Foreign key from Template
}
