import { Component, OnInit } from '@angular/core';
import { Reports } from '../../services/reports/reports';
import { ReportsService } from '../../services/reports/reports.service';
import { Skill } from '../../services/assessment/skill/skill';
import { SkillService } from '../../services/assessment/skill/skill.service';
import { Profile } from '../../services/account_management/profile/profile';
import { ProfileService } from '../../services/account_management/profile/profile.service';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';
import { SharedDataService } from '../../shared/shared-data.service';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css'],
  providers:[ReportsService,SkillService,ProfileService,AccountService]
})
export class ReportsHomeComponent implements OnInit {
  reports: Reports[];
  Skills: Skill[];
   Profiles:Profile[];
  currentAccount :Account;
  showProfile=false;
  currentProfile = '0';
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval =1;
  
  
  constructor(private repser:ReportsService,private skillSer: SkillService,private profSer: ProfileService,
    private accSer: AccountService,private sharedService: SharedDataService) { }

  ngOnInit() {
    
    this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
       this.currentAccount = data;
            this.profSer.getProfiles(this.currentAccount.account_id)
            .subscribe((res: Profile[]) => {
                this.Profiles = res;debugger;
            },
            error => () => {}, () => {});
            },
            error => () => {}, () => {});
    
    this.skillSer.getSkills()
            .subscribe((data: Skill[]) => {
              this.Skills = data;
                },
            error => () => {}, () => {});
    
     
  }

  onProfileClick(e){
    this.showProfile = true;
    this.repser.getAllData(e.target.value).subscribe((res:Reports[])=>{
      this.reports = res;
     },
            error => () => {}, () => {});
  }
}
