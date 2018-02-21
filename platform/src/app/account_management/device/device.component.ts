import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/account_management/device/device.service';
import { Device } from '../../services/account_management/device/device';
import { AccountService } from '../../services/login_page/account/account.service';
import { Account } from '../../services/login_page/account/account';
import { SharedDataService } from '../../shared/shared-data.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  providers:[DeviceService,AccountService]
})
export class DeviceComponent implements OnInit {
currentAccount :Account;
  devices: Device[];
  order = 'device_id';
  reverse = true;
  deviceCount = 0;
  constructor(private devSer:DeviceService,private accSer:AccountService,private sharedService: SharedDataService) { }

  ngOnInit() {
         this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
       this.currentAccount = data;    
    
          this.devSer.getDevices(this.currentAccount.account_id)
            .subscribe((data: Device[]) => {
                this.devices = data;
                this.deviceCount = data.length;
             }, error => () => {}, () => {});
        }, error => () => {}, () => {});
  }
}
