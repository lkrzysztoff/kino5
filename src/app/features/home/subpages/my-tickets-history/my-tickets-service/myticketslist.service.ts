// import { inject, Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Cart } from 'src/app/shared/interfaces/cart-interface';

// export interface orderHistory {
//   itemCount: number;
//   cartPrice: number;
// }

// const PROTOCOL = 'http';
// const PORT = 3000;

// @Injectable({
//   providedIn: 'root',
// })
// export class MyticketslistService {
// private http = inject(HttpClient)
// baseUrl !: string
// tickets$$ = new BehaviorSubject<Cart[][]>([]);
//   get ticket$() {
//     return this.tickets$$.asObservable();
//   }

  // addScore(cart: Cart[]) {
  //   this.tickets$$.next([...this.tickets$$.value, cart]);
  // }

  // constructor() {
  //   this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  // }

  // getOrders(){
  //   return this.http.get<{key:number,value:Cart}[]>(this.baseUrl+'orders')
  // }
// }
