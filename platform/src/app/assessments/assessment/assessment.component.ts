import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared/shared-data.service';
import { GoalService } from '../../services/assessment/goal/goal.service';
import { Goal } from '../../services/assessment/goal/goal';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css'],
  providers:[GoalService,AccountService]
})
export class AssessmentComponent implements OnInit {

  Goals: Goal[];
  accountId= '';
  currentAccount :Account;
  
  constructor(private sharedService: SharedDataService,private goalSer: GoalService,private accSer: AccountService) { }

  ngOnInit() {
     this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
       this.currentAccount = data;    
    
          this.goalSer.getAllGoals(this.currentAccount.account_id)
            .subscribe((data: Goal[]) => {
                this.Goals = data;
             }, error => () => {}, () => {});
        }, error => () => {}, () => {});
  }
}
