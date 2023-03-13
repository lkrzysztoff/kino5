import { Component, OnInit, Input, inject } from '@angular/core';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { User } from '../order/user-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { FilmService } from '../../movies/film-service/film-service';
import { NumberMaxLengthDirective } from 'src/app/shared/guards/directives/numbermaxlength.directive';

const PROTOCOL = 'http';
const PORT = 3000;

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss'],
})
export class OrderCompletedComponent implements OnInit {
  baseUrl!: string;

  private filmService = inject(FilmService);
  private cartService = inject(CartService);
  private service = inject(OrderManagmentService);
  private http = inject(HttpClient);
  private router = inject(Router);

  cartDTO!: Cart[];
  user: User;
  cart$!: Observable<Cart[]>;
  constructor() {
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

  submit(order: Cart[]) {
    this.paymentControl.markAllAsTouched();
    if (this.paymentControl.touched && this.paymentControl.valid) {
      this.sendOrderToBase(order).subscribe((value) =>
        this.afterSentToBase(value.id)
      );
      this.cartService.clearCart();
    } else return;
  }
  afterSentToBase(value: number) {
    this.router.navigate(['/qrcode/' + value]);
  }

  sendOrderToBase(order: Cart[]) {
    return this.cartService.addOrderToBase(order);
  }
}
