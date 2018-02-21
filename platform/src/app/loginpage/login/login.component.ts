import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';
import { LoginService } from '../../services/login_page/login/login.service';
import { Device } from '../../services/account_management/device/device';
import { DeviceService } from '../../services/account_management/device/device.service';
import { Login } from '../../services/login_page/login/login';
import { SharedDataService } from '../../shared/shared-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService, DatePipe, LoginService, DeviceService]
})
export class LoginComponent implements OnInit {
  model: any = {}; currentAccount: Account;
  message : string;
  showMsg = true;
  deviceType = 'undefined';
  constructor(private accser: AccountService, private router: Router, private shared: SharedDataService,
              private logSer: LoginService, private datePipe: DatePipe, private devSer: DeviceService,
              private deviceService: Ng2DeviceService) { }

  ngOnInit() {

  }

  onRegister() {
     /* create account with entered email or phone number */
      this.accser.insertAccount(this.model.email , this.model.password)
            .subscribe((acc: Account) => {
              this.currentAccount = acc;
              if (this.currentAccount) {
                this.shared.saveuserEmail(this.model.email);
                this.router.navigate(['/account-management/account']); }
            }, error => () => { }, () => {});
  }

  onSignIn() {
    let status: number;
     /* create account with entered email or phone number */
      this.accser.signInAccount(this.model.email , this.model.password)
            .subscribe((acc: number) => {
              status = acc;
              if (status > 0)
                this.showMsg = false;
              switch (status) {
                case 1 : this.message = 'You have successfully signed in !';
                         this.shared.saveuserEmail(this.model.email);
                          this.addDeviceInfo();
                          break;
                case 2 : this.message = 'Please enter correct password!'; break;
                case 3 : this.message = 'Please register first and then Sign in!'; break;

              }
            }, error => () => { }, () => {});
  }

  getLoginDetails(): string {
    let today = Date.now();
    let date = this.datePipe.transform(today, 'yMMMMd');
    let time = this.datePipe.transform(today, 'hh:mm a, Z');
    return date + time;
  }

  addDeviceInfo(){
       /*get logged in date and time*/
     let login = this.getLoginDetails();
     this.accser.getAccount(this.shared.getUserEmail())
       .subscribe((res: Account) => {
         this.currentAccount = res;
         if(this.deviceService.isDesktop())
           this.deviceType = 'Desktop';
         else if(this.deviceService.isMobile())
           this.deviceType = 'Mobile';
         else if(this.deviceService.isTablet())
           this.deviceType = 'Tablet';
     
     this.devSer.insertDevice(this.deviceType, 'Online', login, login, this.currentAccount.account_id)
         .subscribe((data) => {
     
                 }, error => () => { }, () => {});
         
               /* get the ip address */
           this.logSer.getIpCliente().subscribe((ip: string) => {
           this.logSer.addLoginDetails(this.currentAccount.account_id, ip, 'active', 'allowed', login)
             .subscribe((res1: Boolean) => {
              
                this.router.navigate(['/dashboard']);
                 }, error => () => { }, () => {});
                 }, error => () => { }, () => {});
                 }, error => () => { }, () => {});
  }
}
