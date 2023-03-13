import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { __values } from 'tslib';
import { TemporaryReserved } from '../temporary-reserved.interface';
import { HttpClient } from '@angular/common/http';
import { Showtest } from '../reservation-grid/reservation-interfaces';
import { map } from 'rxjs';
 

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

  getCurrentReservedSeats(showId:number){
    return this.http.get<Showtest>(this.baseUrl+'show/'+showId)
  }

  cancelReservation(seat: string, showId: number) {
    this.getCurrentReservedSeats(showId)
      .pipe(
        map(({ reservedSeats }) => {
          return reservedSeats.filter((seatPos) => seatPos !== seat);
        })
      )
      .subscribe((reservedSeats) => {
        this.http
          .patch(this.baseUrl + `show/${showId}`, {
            reservedSeats: reservedSeats,
          })
          .subscribe();
      });
  }
}
