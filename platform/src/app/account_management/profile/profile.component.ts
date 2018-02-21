import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../services/account_management/avatar/avatar.service';
import { Avatar } from '../../services/account_management/avatar/avatar';
import { Profile } from '../../services/account_management/profile/profile';
import { ProfileService } from '../../services/account_management/profile/profile.service';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';
import { SharedDataService } from '../../shared/shared-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AvatarService, ProfileService,AccountService,DatePipe]
})
export class ProfileComponent implements OnInit {

  showProfile= false;
  Avatars: Avatar[];
  selectedBodystyle: string;
  avatarUrl = '';
  gender= 'boy';
  age= '0';
  avatarId = '0';
  showSuccess = false;
  Profiles:Profile[];
  currentAccount :Account;
  avatarUrls : String[]=[];
  order= 'avatar_id';
  profileCount = 0;
  constructor(private avatarSer: AvatarService, private profSer: ProfileService,private sharedService: SharedDataService,
              private accSer: AccountService,private datePipe: DatePipe) { }

  ngOnInit() {
    let i =0;
     this.avatarSer.selectAvatars()
            .subscribe((data: Avatar[]) => {this.Avatars = data;
              for ( i = 0; i < this.Avatars.length; i++) {
                if ( this.Avatars[i].avatar_id === '1') {
             this.avatarUrl = this.Avatars[i].avatar_url;
              this.avatarId = this.Avatars[i].avatar_id; } }
             },
            error => () => {}, () => {});
    
    this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
       this.currentAccount = data;
           this.getProfiles();
            },
            error => () => {}, () => {});
  }
  
  getProfiles(){
     this.profSer.getProfiles(this.currentAccount.account_id)
            .subscribe((res: Profile[]) => {
                this.Profiles = res
                this.profileCount = res.length;
            },
            error => () => {}, () => {});
  }

  onAvatarSelect(e) {debugger;
    let i=0;
    this.avatarUrl = e.target.value;
    for ( i = 0; i < this.Avatars.length; i++)
      if (this.Avatars[i].avatar_url === this.avatarUrl)
        this.avatarId = this.Avatars[i].avatar_id;
  }
  
    onAgeSelect(e) {
    this.age = e.target.value;
  }
  
  onCreateProfile() {
    
    let datetime =this.getLoginDetails();    
        this.profSer.insertProfile(this.age, this.gender, this.avatarId,this.currentAccount.account_id,datetime)
            .subscribe((res:Profile) => {
              this.getProfiles();
              this.showSuccess = true;             
             }, error => () => {}, () => {});
  }

  onSelectGender(e) {
    this.gender = e.target.value;
  }
  
  getLoginDetails():string{
    let today = Date.now();
    let date = this.datePipe.transform(today, 'yMMMMd');
    let time = this.datePipe.transform(today, 'hh:mm a, Z');
    return date+time;
  }
}
