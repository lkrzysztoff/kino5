import { Component, OnInit, Input, inject } from '@angular/core';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { User } from '../order/user';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlikCode } from './blik.interface';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Route, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import {
  MyticketslistService,
  orderHistory,
} from 'src/app/features/home/subpages/watchlist/myticketslist.service';

const PROTOCOL = 'http';
const PORT = 3000;

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss'],
})
export class OrderCompletedComponent implements OnInit {
  baseUrl!: string;
  blikCode!: BlikCode[];
  blikValueArray!: any;

  ticketService = inject(MyticketslistService);

  cart = inject(Cart);

  // fn()  {

  //   return this.http.post<[orderHistory]>(this.baseUrl+"tickets",{"ticket":[JSON.stringify(this.obiekcik)]}).subscribe(
  //     value => {console.log(value)}
  //   );

  // }

  // get blik$() {
  //   return this.http.get<BlikCode[]>(this.baseUrl+"blik");
  // }

  // .subscribe(data => {
  //   this.blikValue = data.blikCode;
  // }

  // )

  obiekcik!: orderHistory;
  userito: User;
  constructor(
    public service: OrderManagmentService,
    private http: HttpClient,
    private router: Router
  ) {
    this.userito = this.service.userdata;

    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  dupa() {}
  ngOnInit(): void {
    this.http.get<BlikCode[]>(this.baseUrl + 'blik').subscribe({
      next: (response) => {
        console.log(response);
      },
    });

    this.obiekcik = Object.assign({}, this.cart);
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
    // this.paymentControl.markAllAsTouched();
    // if (this.paymentControl.valid){
    //   } this.router.navigate(['/order-completed']);
    // }
    // if (this.paymentControl.invalid) {
    // return;
    // } this.router.navigate(['/order-completed']);
    // if (this.paymentControl.value === this.blikValueArray[0]){
    //   console.log("Płatność zakończona")
    // } else console.log( "chujowy kod blik")
    // console.log(Object.values(this.blikCode))
    // console.log(this.blikValueArray[0]);
    // console.log(this.blikValueArray[0] == this.paymentControl.value)

    // this.paymentControl.markAllAsTouched();
    // if (this.paymentControl.invalid) {
    //   return;
    // }
    // return JSON.stringify(this.blikValue);
  }

  // isBlikProper(){
  //   this.blikValueArray = (Object.values(this.blikCode));
  //   return this.blikValueArray[0] == this.paymentControl.value;
  // }
}
