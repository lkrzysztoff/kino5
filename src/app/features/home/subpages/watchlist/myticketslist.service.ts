import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartLine } from 'src/app/model/cart.model';
import { Seat } from 'src/app/model/seat.model';


export interface orderHistory {
  lines: CartLine[],
  itemCount: number,
  cartPrice: number
}


@Injectable({
  providedIn: 'root'
})

export class MyticketslistService {
  tickets$$ = new BehaviorSubject<orderHistory[]>([]);

  get ticket$(){
    return this.tickets$$.asObservable();
  }

  addScore(cart: orderHistory){
    this.tickets$$.next([...this.tickets$$.value, cart]);
  }
getObiekcik (obiekcik: orderHistory) {
  return obiekcik
}
  // removeScore(cartId:number){
  //   this.tickets$$.next(this.tickets$$.value.filter(({id}) =>id !== cartId ))
  // }


  // hasScore(cartId:number) : boolean {
  //   return this.tickets$$.value.some(({id}) => id ===cartId);
  // }
  constructor() { }
}
