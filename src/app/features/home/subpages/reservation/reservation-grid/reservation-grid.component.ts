import { Component, inject, OnInit, OnDestroy, Input } from '@angular/core';
import { repertoire } from '../../../../admin/pages/add-shows-admin/showform/showform.interface';
import { FilmService } from '../../movies/film-service/film-service';
import { Film } from '../../../../../shared/interfaces/film.interface';
import { Show } from '../../../../../shared/interfaces/show.interface';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { Screen } from '../../../../../shared/interfaces/screen.interface';
import { priceType } from '../../../../../shared/interfaces/show.interface';
import { ReservationService } from '../reservation-service/reservation.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CartService } from '../../../../../shared/services/cart.service';
import { Cart } from '../../../../../shared/interfaces/cart-interface';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '../../../../../core/store/user.selectors';
import { Showtest } from './reservation-interfaces';
import { Screens } from './reservation-interfaces';
import { testFilm } from './reservation-interfaces';
import { HttpClient } from '@angular/common/http';

// export interface testFilm {
//   title: string;
//   id: number;
//   genre: string;
// }
// export interface Screens {
//   id: number;
//   name: string; //"B",
//   rows: number; //5,
//   colu: number; //  specialSeats: string[] //["E4", "D4", "E5", "D5"]
// }

// export interface Showtest {
//   id: number; //0,
//   hour: string; //"12.30",
//   screen: number; //"B",
//   reservedSeats: string[]; //["A3", "C4", "H5"],
//   priceList: priceType[];
//   filmId: number; //0
// }

const numbersArray: number[] = [];

@Component({
  selector: 'app-reservation-grid',
  templateUrl: './reservation-grid.component.html',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, AsyncPipe],
  styleUrls: ['./reservation-grid.component.scss'],
})
export class TestComponent implements OnInit {
  @Input() show!: Showtest;
  @Input() date!: string;
  @Input() film!: Film;


  service = inject(FilmService);
  reservationService = inject(ReservationService);
  repertoire!: repertoire[];
  shows!: Show[];
  dataService = inject(OrderManagmentService);
  formBuilder = inject(NonNullableFormBuilder);
  cartService = inject(CartService);
  private store = inject(Store);
  private http = inject(HttpClient)

  user$ = this.store.select(selectLoggedUser);
  //   filmsAll!: Film[];
  //   films!: {title:string,id:number,genre:string}[];

  // films$ !: {title:string}
  // filmsSub !: Subscription

  films$!: Observable<Film[]>;
  show$!: Observable<Showtest[]>;
  screen$!: Observable<Screens[]>;
  cart$!: Observable<Cart[]>;
  temporaryReservedSeats$!: Observable<string[]>;
  seatForm = this.createSeatForm();

  private createSeatForm() {
    const form = this.formBuilder.group({
      ticketType: this.formBuilder.control('', [Validators.required]),
    });
    return form;
  }

  addToTicketState(id: string, position: string, email: string) {
    const ticketDTO: Cart = {
      id: id,
      email: email,
      showId: this.show.id,
      date: this.date,
      hour: this.show.hour,
      movieTitle: this.film.title,
      screen: this.show.screen,
      seat: {
        position: position,
        price: this.show.priceList[0].price,
        type: this.show.priceList[0].type,
      },
    };
    this.cartService.addToCart$$(ticketDTO);
  }

  checkReserved(seat: string, show: Showtest) {
    return show.reservedSeats.includes(seat);
  }

  // reservationManagment(seat:string, show: Showtest,cart:Cart[]){
  //   if(this.checkReserved(seat,show)){
  //     this.reservationService.cancelReservation(seat,show.id)
  //     console.log('deleted')
  //   // } else this.reserveSeats(cart,show)
  //   } else this.reserveSeats(cart,show)
  // }

  dodajtest(seat: string, showId: number) {
    this.seatForm.markAllAsTouched();
    if (this.seatForm.invalid) {
      return;
    } else
      return (
        this.seatForm.getRawValue(),
        console.log(seat, this.seatForm.value, showId)
      );
  }

  isFormValid() {
    return this.seatForm.invalid;
  }

  getShowByDate(date: string) {
    return this.repertoire
      .filter((record) => {
        return date == record.date;
      })
      .pop();
  }

seatsReload(){
 
}

  reserveSeats(cart:Cart[],show: Showtest){
    const seatArray: string[] = []
    console.log(show)
    cart.forEach((element) => {
      if (show.reservedSeats.indexOf(element.id)<0){
        show.reservedSeats.push(element.id)
      } 
      this.http.put<Showtest>('http://localhost:3000/show/'+this.show.id,show).subscribe(
        value => console.log(value)
      )
      // seatArray.push(element.id)
    })
    console.log(seatArray)
  }

  deleteFromReserved(cart: Cart[],show: Showtest){
    const seatArray: string[] = []
    console.log(show)
    cart.forEach((element) => {
      if (show.reservedSeats.indexOf(element.id)<0){
        show.reservedSeats.pop()
      } 
      this.http.put<Showtest>('http://localhost:3000/show/'+this.show.id,show).subscribe(
        value => console.log(value)
      )
      // seatArray.push(element.id)
    })
    console.log(seatArray)
  }

  private properFilms(films: Film[]): testFilm[] {
    return films.map((films) => ({
      title: films.title,
      id: films.id,
      genre: films.genre,
    }));
  }
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  createNumbersArray(rows: number) {
    let numbers = [];
    for (let i = 1; i <= rows; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  displayProperAmmountOfLetters(letters: string[], rows: number) {
    return letters.slice(0, rows);
  }

  displayProperAmmountOfNumbers(columns: number) {
    numbersArray.filter((numbers) => numbers <= columns);
  }

  returnFilmsById(films: Film[], id: number) {
    return films.filter((films) => films.id === id);
  }

  returnScreenById(screen: Screens[], id: number) {
    return screen.filter((screen) => screen.id == id);
  }

 

  ngOnInit(): void {
    this.show$ = this.service
      .getShowtest()
      .pipe(map((value) => value.filter((value) => value.id == 4)));
    this.films$ = this.service.getFilms();
    this.screen$ = this.service.getScreens();
    this.cart$ = this.cartService.cart$;
  }

  get vid$() {
    return this.service.getFilms();
  }
}
