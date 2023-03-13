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
    if (this.doesCartHave(ticket.seat.position, ticket.showId)) {
      this.removeFromCart(ticket.seat.position);
    } else {
      this.cart$$.next([...this.cart$$.value, ticket]);
    }
  }

  addOrderToBase(order: Cart[]) {
    return this.http.post<{id:number, value:Cart[]}>('http://localhost:3000/orders', order);
  }

  removeFromCart(seat: string) {
    this.cart$$.next(
      this.cart$$.value.filter(
        (value) => value.seat.position !== seat && value.id !== seat
      )
    );
  }

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