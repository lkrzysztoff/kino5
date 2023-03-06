import { Component, OnInit, inject } from '@angular/core';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { User } from '../order/user-interface';
import { orderHistory } from 'src/app/features/home/subpages/my-tickets-history/my-tickets-service/myticketslist.service';

@Component({
  selector: 'app-order-generated',
  templateUrl: './order-generated.component.html',
  styleUrls: ['./order-generated.component.scss'],
})
export class OrderGeneratedComponent implements OnInit {
  user!: User;
  constructor(private managmentService: OrderManagmentService) {
  }

  cartCopy!: orderHistory;

  ngOnInit(): void {
    this.user = this.managmentService.userdata;
  }
}
