import { Component, OnInit, Input } from '@angular/core';
import { OrderManagmentService } from '../order-managment.service';
import { User } from '../order/user';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {    

  userito :  User;
  booksList: any;
  constructor(public service : OrderManagmentService) { 
    this.userito = this.service.userdata
  }

dupa(){
  console.log(this.service.userdata);
}
  ngOnInit(): void {

  }

}
