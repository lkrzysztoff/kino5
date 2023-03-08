import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { __values } from 'tslib';
import { TemporaryReserved } from '../temporary-reserved.interface';
import { HttpClient } from '@angular/common/http';
import { Showtest } from '../reservation-grid/reservation-grid.component';
 

const PROTOCOL = 'http';
const PORT = 3000;


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http = inject(HttpClient)
  temporaryReservedSeats$$ = new BehaviorSubject<TemporaryReserved[]>([]);

  get temporaryReservedSeats$() {
    return this.temporaryReservedSeats$$.asObservable();
  }

  addToTemporaryReservedSeats(seat: TemporaryReserved) {
    if (this.isSeatInTemporaryReserved(seat.seat, seat.showId)) {
      this.removeFromTemporaryReservedSeats(seat);
    } else {
      this.temporaryReservedSeats$$.next([
        ...this.temporaryReservedSeats$$.value,
        seat,
      ]);
    }
  }

  // afterReturn(show: addShowInterface,repertoire:repertoire){
  //   const showId = (show.id ? show.id : 0 );
  //   if(!repertoire.shows.includes(showId)){
  //     repertoire.shows.push(showId);
  //     this.http.put<repertoire>(this.baseUrl+'repertoire/'+repertoire.id,repertoire).subscribe(
  //       value => console.log(value)
  //     )
  //   }

  reserveSeat(arr: string,showId:number,show:Showtest) {
    const actuallyReserved = show.reservedSeats.push(arr)
    return this.http
      .put(this.baseUrl+'show/'+showId,{
        "reservedSeats":arr
      }).subscribe(value => console.log(value))
  }

  removeFromTemporaryReservedSeats(seat: TemporaryReserved) {
    this.temporaryReservedSeats$$.next(
      this.temporaryReservedSeats$$.value.filter(
        (valueSeat) => valueSeat !== seat
      )
    );
    console.log(
      this.temporaryReservedSeats$$.value.filter(
        (valueSeat) => valueSeat !== seat
      )
    );
  }

  isSeatInTemporaryReserved(seat: string, showId: number) {
    return this.temporaryReservedSeats$$.value.some(
      (value) => value.seat == seat && value.showId == showId
    );
  }

  addSeatToReserved() {}

  check(seat: TemporaryReserved) {
    return this.temporaryReservedSeats$$.value.some(
      (value) => (value.seat = seat.seat)
    );
  }
  baseUrl!: string
  constructor() {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
}
