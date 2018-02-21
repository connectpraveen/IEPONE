/* Class to store Account data which can be imported by other components */
export class Account {
  account_id: string;
  email: string;
  pwd; string;
  email_verified: boolean;
  device_id: string;
  phone_number: string;
  phone_verified: boolean;
  
  constructor(account_id: string, email: string,pwd: string,email_verified: boolean, device_id: string, phone_number: string, phone_verified: boolean) {
    this.account_id = account_id;
    this.email = email;
    this.pwd = pwd;
    this.email_verified = email_verified;
    this.device_id = device_id;
    this.phone_number = phone_number;
    this.phone_verified = phone_verified;
    }
  }
