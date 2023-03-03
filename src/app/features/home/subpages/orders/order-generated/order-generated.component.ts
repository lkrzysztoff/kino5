import { Component, OnInit, inject } from '@angular/core';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { User } from '../order/user';
import { Cart } from 'src/app/model/cart.model';
import { orderHistory } from 'src/app/features/home/subpages/watchlist/myticketslist.service';

@Component({
  selector: 'app-order-generated',
  templateUrl: './order-generated.component.html',
  styleUrls: ['./order-generated.component.scss'],
})
export class OrderGeneratedComponent implements OnInit {
  user!: User;
  cart = inject(Cart);
  constructor(private managmentService: OrderManagmentService) {
    this.cartCopy = Object.assign({}, this.cart);
  }

  cartCopy!: orderHistory;

  ngOnInit(): void {
    this.user = this.managmentService.userdata;
  }
}
