import { Component, OnInit, inject } from '@angular/core';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { User } from '../order/user-interface';


@Component({
  selector: 'app-order-generated',
  templateUrl: './order-generated.component.html',
  styleUrls: ['./order-generated.component.scss'],
})
export class OrderGeneratedComponent implements OnInit {
  user!: User;
  constructor(private managmentService: OrderManagmentService) {
  }

  

  ngOnInit(): void {
    this.user = this.managmentService.userdata;
  }
}
