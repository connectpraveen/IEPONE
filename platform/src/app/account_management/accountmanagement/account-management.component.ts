import { Component, OnInit,ElementRef ,ViewChild } from '@angular/core';


@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  accountClass='account';
  @ViewChild('account') account: ElementRef;
 
  constructor() { }

  ngOnInit() {debugger;
    //this.account.nativeElement.css ='account';
  }

}
