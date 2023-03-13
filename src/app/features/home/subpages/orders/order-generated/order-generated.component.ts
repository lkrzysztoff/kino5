import { Component, OnInit, inject } from '@angular/core';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { User } from '../order/user-interface';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-generated',
  templateUrl: './order-generated.component.html',
  styleUrls: ['./order-generated.component.scss'],
})
export class OrderGeneratedComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private http = inject(HttpClient);
  user!: User;
  constructor(private managmentService: OrderManagmentService) {}
  orders$!: Observable<{ value: Cart }[]>;
  orderId!: number;

  ngOnInit(): void {
    this.activeRoute.params.forEach((params: Params) => {
      this.orderId = params['orderId'];
    });
    this.user = this.managmentService.userdata;
    this.orders$ = this.getOrder();
  }
  getOrder() {
    return this.http.get<{ value: Cart; id: number }[]>(
      'http://localhost:3000/orders/' + this.orderId
    );
  }

  returnValues(object: unknown | object) {
    return Object.values(object ? object : {});
  }
}
