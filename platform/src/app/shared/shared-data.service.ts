import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class SharedDataService {

  /* variable holding the social profile with which the user has logged in */
  private show = 'none';
  private orderId = 'none';
  private verlink = 'none';
  private userEmail = 'none';
  
   private servletUrl = 'http://qa-service-iepone.appspot.com/';
  //private servletUrl = 'http://localhost:8080/';
  //private servletUrl = 'http://192.168.99.100:8080/';
  private api_url = 'http://35.227.24.81:9000/';
  //private api_url = 'http://localhost:9000/';
  
  /* event to display template based on show */
  showPageEvent: EventEmitter<string> = new EventEmitter<string>();
  
  /* Function to save the user email entered in registration*/
  saveuserEmail(userEmail: string) {
    this.userEmail = userEmail;
  }
    
    /* Function to get the user email entered in registration */
  getUserEmail(): string {
    return this.userEmail;
  }
  
  /* Function to save the verification link */
  saveVerificationLink(verlink: string) {debugger;
    this.verlink = verlink;
  }
    
    /* Function to get the verification link */
  getVerLink(): string {
    return this.verlink;
  }
  
  /* Function to save the linked social profile */
  savePage(show: string) {
    this.show = show;
  }
    
    /* Function to get the linked social profile */
  getPage(): string {
    return this.show;
  }
  
    /* Function to save the linked social profile */
  saveOrderId(orderId: string) {
    this.orderId = orderId;
  }
    
    /* Function to get the linked social profile */
  getOrderId(): string {
    return this.orderId;
  }
  
  getApiUrl(): string{
    return this.api_url;
  }
   getServletUrl(): string{
    return this.servletUrl;
  }
  
  constructor() { }
  
}
