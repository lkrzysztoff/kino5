import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seat } from 'src/app/model/seat.model';
import { Cart } from 'src/app/test/cart-interface';

export interface orderHistory {
  itemCount: number,
  cartPrice: number
}


@Injectable({
  providedIn: 'root'
})

export class MyticketslistService {
  tickets$$ = new BehaviorSubject<Cart[][]>([]);

  get ticket$(){
    return this.tickets$$.asObservable();
  }

  addScore(cart: Cart[]){
    this.tickets$$.next([...this.tickets$$.value, cart]);
  }

  // removeScore(cartId:number){
  //   this.tickets$$.next(this.tickets$$.value.filter(({id}) =>id !== cartId ))
  // }


  // hasScore(cartId:number) : boolean {
  //   return this.tickets$$.value.some(({id}) => id ===cartId);
  // }
  constructor() { }
}
