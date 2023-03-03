import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemporaryReserved } from './temporary-reserved.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  temporaryReservedSeats$$ = new BehaviorSubject<string[]>([]);

  get temporaryReservedSeats$() {
    return this.temporaryReservedSeats$$.asObservable();
  }

  addToTemporaryReservedSeats(seat: string) {
    if(this.isSeatInTemporaryReserved(seat)){
      this.removeFromTemporaryReservedSeats(seat)
    } else {
      this.temporaryReservedSeats$$.next([
        ...this.temporaryReservedSeats$$.value,
        seat,
      ]);
    }
      
  }

  
  removeFromTemporaryReservedSeats(seat: string) {
    this.temporaryReservedSeats$$.next(
      this.temporaryReservedSeats$$.value.filter(value => value !== seat)
    )
    
  }

  isSeatInTemporaryReserved(seat: string) {
    return this.temporaryReservedSeats$$.value.includes(seat);
  }

  addSeatToReserved() {

  }

  
}

