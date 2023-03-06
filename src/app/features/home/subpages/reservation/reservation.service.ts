import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/test/cart-interface';
import { __values } from 'tslib';
import { TemporaryReserved } from './temporary-reserved.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  temporaryReservedSeats$$ = new BehaviorSubject<TemporaryReserved[]>([]);

  get temporaryReservedSeats$() {
    return this.temporaryReservedSeats$$.asObservable();
  }

  addToTemporaryReservedSeats(seat: TemporaryReserved) {
    if(this.isSeatInTemporaryReserved(seat.seat,seat.showId)){
      this.removeFromTemporaryReservedSeats(seat)
    } else {
      this.temporaryReservedSeats$$.next([
        ...this.temporaryReservedSeats$$.value,seat 
      ]);
    }
  }

  
  removeFromTemporaryReservedSeats(seat: TemporaryReserved) {
    this.temporaryReservedSeats$$.next(
      this.temporaryReservedSeats$$.value.filter(valueSeat => valueSeat !== seat)
    )
    console.log( this.temporaryReservedSeats$$.value.filter(valueSeat => valueSeat !== seat))
  }

  isSeatInTemporaryReserved(seat: string,showId:number) {
    return this.temporaryReservedSeats$$.value.some(value => value.seat == seat&&value.showId == showId);
  }

  addSeatToReserved() {

  }

  check(seat: TemporaryReserved){
   return this.temporaryReservedSeats$$.value.some((value) => value.seat = seat.seat)
  }


  

}

