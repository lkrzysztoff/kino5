import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, seats } from '../interfaces/cart-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$$ = new BehaviorSubject<Cart[]>([]);
  private http = inject (HttpClient)
  get cart$() {
    return this.cart$$.asObservable();
  }

  addToCart$$(ticket: Cart) {
    // this.cart$$.next([
    //   ...this.cart$$.value,
    //   ticket,
    // ]);
    // console.log(this.cart$$.value)
    if (this.doesCartHave(ticket.seat.position, ticket.showId)) {
      this.removeFromCart(ticket.seat.position);
    } else {
      this.cart$$.next([...this.cart$$.value, ticket]);
      console.log(this.cart$$.value);
    }
  }

  addOrderToBase(order: Cart[]) {
    return this.http.post<Cart[]>('http://localhost:3000/orders', order);
  }

  // addToTemporaryReservedSeats(seat: TemporaryReserved) {
  //   if(this.isSeatInTemporaryReserved(seat.seat,seat.showId)){
  //     this.removeFromTemporaryReservedSeats(seat)
  //   } else {
  //     this.temporaryReservedSeats$$.next([
  //       ...this.temporaryReservedSeats$$.value,seat
  //     ]);
  //   }
  // }

  removeFromCart(seat: string) {
    this.cart$$.next(
      this.cart$$.value.filter(
        (value) => value.seat.position !== seat && value.id !== seat
      )
    );
    console.log(this.cart$$.value);
  }

  // isSeatInTemporaryReserved(seat: string,showId:number) {
  //   return this.temporaryReservedSeats$$.value.some(value => value.seat == seat&&value.showId == showId);
  // }

  filterCartByShowId(cart: Cart[], showId: number) {
    return cart.filter((cart) => cart.showId == showId);
  }

  doesCartHave(seat: string, showId: number) {
    return this.cart$$.value.some(
      (value) => value.seat.position == seat && value.showId == showId
    );
  }

  constructor() {}

  updateSeatTypeAndPrice(id: string, type: string, price: number) {
    this.cart$$.value.map((ticket) => {
      if (ticket.id === id) {
        ticket.seat.type = type;
        ticket.seat.price = price;
      }
    });
  }

  clearCart() {
    this.cart$$.next([]);
  }
}

// addToTemporaryReservedSeats(seat: TemporaryReserved) {
//   if(this.isSeatInTemporaryReserved(seat.seat,seat.showId)){
//     this.removeFromTemporaryReservedSeats(seat)
//   } else {
//     this.temporaryReservedSeats$$.next([
//       ...this.temporaryReservedSeats$$.value,seat
//     ]);
//   }
// }

// removeFromTemporaryReservedSeats(seat: TemporaryReserved) {
//   this.temporaryReservedSeats$$.next(
//     this.temporaryReservedSeats$$.value.filter(valueSeat => valueSeat !== seat)
//   )
//   console.log( this.temporaryReservedSeats$$.value.filter(valueSeat => valueSeat !== seat))
// }

// isSeatInTemporaryReserved(seat: string,showId:number) {
//   return this.temporaryReservedSeats$$.value.some(value => value.seat == seat&&value.showId == showId);
// }

// addSeatToReserved() {

// }

// check(seat: TemporaryReserved){
//  return this.temporaryReservedSeats$$.value.some((value) => value.seat = seat.seat)
// }
