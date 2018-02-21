import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';
import { AccountService } from '../services/login_page/account/account.service';
import { Account } from '../services/login_page/account/account';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AccountService]
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedDataService,private accser: AccountService,private router: Router) { }

  ngOnInit() {
  }
  
  onSignOut(){
     this.accser.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
    
    this.accser.signOutAccount(data.account_id)
            .subscribe((acc: number) => {debugger;
              if(acc > 0){
                this.router.navigate(['/login']);
              }
                }, error => () => { }, () => {});
        },
            error => () => {}, () => {});
  }
       

}
