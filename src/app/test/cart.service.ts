import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Cart } from './cart-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cart$$ = new BehaviorSubject<Cart[]>([])

get cart$(){
  return this.cart$$.asObservable()
}

addToCart$$(ticket: Cart){
  this.cart$$.next([
    ...this.cart$$.value,
    ticket,
  ]);
  console.log(this.cart$$.value)
}


removeFromCart(seat:string){
  this.cart$$.next(
    this.cart$$.value.filter(value => value.seat !== seat)
  )
  console.log(this.cart$$.value)
}

doesCartHave(seat:string){
    return this.cart$$.value.some(( value ) => value.seat === seat);
}

  constructor() { }
}
