import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

temporaryReservedSeats$$ = new BehaviorSubject<string[]>([])  

get temporaryReservedSeats$ (){
  return this.temporaryReservedSeats$$.asObservable()
}

addToTemporaryReservedSeats(seat: string){
this.temporaryReservedSeats$$.next([...this.temporaryReservedSeats$$.value,seat]),
console.log("DODANO"+seat)
}

removeFromTemporaryReservedSeats(seat:string){
this.temporaryReservedSeats$$.value.filter(seat => seat != seat)
console.log("USUNIETO"+seat)
}

isSeatInTemporaryReserved(seat:string){
return this.temporaryReservedSeats$$.value.includes(seat)
}

addSeatToReserved(){

}



}
