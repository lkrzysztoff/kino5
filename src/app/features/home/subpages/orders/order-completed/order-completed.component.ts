import { Component, OnInit, Input, inject } from '@angular/core';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { User } from '../order/user-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/test/cart-interface';
import {
  MyticketslistService,
} from 'src/app/features/home/subpages/my-tickets-history/my-tickets-service/myticketslist.service';
import { CartService } from 'src/app/test/cart.service';
import { MainDataSource } from 'src/app/model/main.datasource.service';

const PROTOCOL = 'http';
const PORT = 3000;

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss'],
})
export class OrderCompletedComponent implements OnInit {
  baseUrl!: string;

  filmService = inject(MainDataSource);
  ticketService = inject(MyticketslistService);
  cartService = inject(CartService);

  cartDTO!: Cart[];
  user: User;
  cart$!: Observable<Cart[]>;
  constructor(
    public service: OrderManagmentService,
    private http: HttpClient,
    private router: Router
  ) {
    this.user = this.service.userdata;

    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartDTO = Object.assign({}, this.cartService.cart$$.value);
  }

  paymentControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(6),
    ],
  });

  submit() {
    this.paymentControl.markAllAsTouched();
    if (this.paymentControl.touched && this.paymentControl.valid) {
      this.router.navigate(['/qrcode']);
    } else return;
  }
}
