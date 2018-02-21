import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../../../services/account_management/subscription/subscribe.service';
import { Subscription } from '../../../services/account_management/subscription/subscription';
import { SharedDataService } from '../../../shared/shared-data.service';
import { Service } from '../../../services/account_management/services/service';
import { ServicesService } from '../../../services/account_management/services/services.service';
import { DiscountService } from '../../../services/account_management/discount/discount.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../services/account_management/payment/payment.service';
import { Payment } from '../../../services/account_management/payment/payment';
import { OrderService } from '../../../services/account_management/order/order.service';
import { AccountService } from '../../../services/login_page/account/account.service';
import { Account } from '../../../services/login_page/account/account';

@Component({
  selector: 'subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [SubscribeService, ServicesService, DiscountService, PaymentService, OrderService,AccountService]
})
export class SubscriptionComponent implements OnInit {

  acntSubscribed = false;
  showSection2=false;
  showSection1=false;
  expiryDate: string;
  subsCode: string;
  modalReference: any;
  model: any = {};
  currentAccountId='null';
  msg= '';
  showMsg= false;
  service: string;
  Services: Service[];
  cost = '29.99';
  applyDiscount = false;
  discountAmnt: string;
  Payments: Payment[];
  expiredDiscount = false;
  quantity = 0;
  order= 'service_id';
  selectedPaymentId='0';
  showSuccess=false;
  discountPercentage:any;
  subsDetails: Subscription[];
  constructor(private subSer: SubscribeService, private sharedService: SharedDataService, private modalService: NgbModal,
  private serservice: ServicesService, private discServ: DiscountService, private paymentService: PaymentService,
  private ordSer: OrderService,private accSer: AccountService) { }

  ngOnInit() {
    const email = this.sharedService.getUserEmail();
    this.model.qty = 1;
    this.service = '1';
    this.discountAmnt = '0';
    this.discountPercentage =0;
     this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {
       this.currentAccountId = data.account_id;
      this.getActiveSubscriptionCode();      
         },
            error => () => {}, () => {});
    
     /* get all services */
   this.serservice.getServices()
            .subscribe((data: Service[]) => {this.Services = data; },
            error => () => {}, () => {});
    
      /* get all payment methods */
    this.paymentService.getAllPayment()
            .subscribe((data: Payment[]) => {this.Payments = data; },
            error => () => {}, () => {});
    
  }
  
  getActiveSubscriptionCode(){
  this.subSer.getIfSubscribed(this.currentAccountId )
     .subscribe((res: Subscription) => {
       this.acntSubscribed = true;
       this.expiryDate = res.expiry_datetime;
       this.subsCode = res.subscription_code;
       this.getAllSubscriptions();
      },
            error => () => {}, () => {});
  }
  
   getAllSubscriptions(){
  this.subSer.getallSubscriptions(this.currentAccountId )
     .subscribe((res: Subscription[]) => {
       this.subsDetails = res;       
      },error => () => {}, () => {});
  }
  
     /* function to invoke and open a modal-dialog when user clicks on LINK PROFILE TO SOCIAL MEDIA */
  open(content, event) {
        this.modalReference = this.modalService.open(content);  
  }
  
  onAddSubs() {    
    this.subSer.updateSubscription(this.currentAccountId, this.model.code)
    .subscribe((data: number) => {
      switch(data){
        case 1: this.msg = 'Your subscription has been changed successfully!';
                this.getActiveSubscriptionCode();
                this.showMsg = true; break;
        case 2: this.msg = 'The subscription code you entered has expired!';
                this.showMsg = true; break;
        case 3: this.msg = 'There is no subscription with this code!';
                this.showMsg = true; break;
      }
    }, error => () => { }, () => {});
  }
  
  onSelectService(e) {
    this.service = e.target.value;
   this.CalculateCost();
  }
  CalculateCost() {
      this.cost = '29.99';
     this.quantity =  this.model.qty;
    switch (this.service) {
      case '1': this.cost = (parseFloat(this.cost) * this.quantity).toString();
        break;
      case '2': this.cost = (parseFloat(this.cost) * this.quantity * 5).toString();
                break;
      case '3': this.cost = (parseFloat(this.cost) * this.quantity * 10).toString();
                break;
  }
    if(this.discountAmnt!==null){
      this.discountAmnt = (parseFloat(this.cost) * this.discountPercentage).toString();
        this.cost = (parseFloat(this.cost) - parseFloat(this.discountAmnt)).toString();
    }
  }
  
  onApplyDiscount() {
    if (this.model.discount !== '') {
      this.applyDiscount = true;
      this.discServ.getDiscountByCode(this.model.discount)
      .subscribe((data: number) => {this.discountPercentage = data;
        if (this.discountPercentage === null) {
          this.expiredDiscount = true;
        }
         this.discountAmnt = (parseFloat(this.cost) * this.discountPercentage).toString();
        this.cost = (parseFloat(this.cost) - parseFloat(this.discountAmnt)).toString();
        }, error => () => { }, () => {});
      }else{
      this.discountPercentage = 0;
      this.discountAmnt = '0';
      this.CalculateCost();
    }
    }
    
  onCancel() {
    this.model.discount = '';
    this.applyDiscount = false;
    this.discountAmnt = '';
  }
  
  onChangeQuantity() {
    this.CalculateCost();
  }
  
  onChangeCode() {
    this.expiredDiscount = false;
    this.CalculateCost();
  }
  
  onSelectPayment(e){debugger
    this.selectedPaymentId=e.target.value;
  }
  
  onPayment() {
    this.showSuccess=true;
    ; let i = 0;
    
    if(this.currentAccountId === 'null'){
       this.accSer.getAccount(this.sharedService.getUserEmail())
     .subscribe((data: Account) => {this.currentAccountId = data.account_id;
       this.placeOrder();
       }, error => () => { }, () => {});
    }else {this.placeOrder();}
    }
    
    placeOrder(){
       let subs: String[];
       this.subSer.insertSubscription(this.currentAccountId, this.service, this.quantity)
    .subscribe((data: String[]) => {subs = data;
     
          this.ordSer.insertOrder(subs, this.selectedPaymentId,this.cost)
        .subscribe((res) => {}, error => () => { }, () => {});
    
    }, error => () => { }, () => {});
  }
    
   
}
  
