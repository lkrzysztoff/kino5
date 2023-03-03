import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { repertoire } from '../features/admin/pages/add-shows-admin/showform/showform.interface';
import { MainDataSource } from '../model/main.datasource.service';
import { Film } from '../model/film.model';
import { Show } from '../model/show.model';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { OrderManagmentService } from '../order-managment.service';
import { FilmRepository } from '../model/film.repository';
import { Screen } from '../model/screen.model';
import { priceType } from '../model/show.model';
import { ReservationService } from '../features/home/subpages/reservation/reservation.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CartService } from './cart.service';
import { Cart } from './cart-interface';
import {MatSelectModule} from '@angular/material/select';


export interface testFilm {
  title: string;
  id: number;
  genre: string;
}
export interface Screens {
   
  id : number,
  name: string, //"B",
  rows: number, //5,
  colu: number, //  specialSeats: string[] //["E4", "D4", "E5", "D5"]        

}

export interface Showtest {
    
  id: number, //0,
  hour: string, //"12.30",
  screen: number, //"B", 
  reservedSeats: string[], //["A3", "C4", "H5"],
  priceList: priceType[],
  filmId: number, //0

}

const numbersArray: number[] = []

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  service = inject(MainDataSource);
  reservationService = inject (ReservationService)
  repertoire!: repertoire[];
  shows!: Show[];
  dataService = inject(OrderManagmentService);
  formBuilder = inject (NonNullableFormBuilder)
  cartService = inject(CartService)


  //   filmsAll!: Film[];
  //   films!: {title:string,id:number,genre:string}[];

  // films$ !: {title:string}
  // filmsSub !: Subscription

  films$!: Observable<Film[]>;
  show$ !: Observable<Showtest[]>;
  screen$ !: Observable<Screens[]>;
  cart$ !: Observable<Cart[]>
  temporaryReservedSeats$ !: Observable<string[]>
  seatForm = this.createSeatForm();

  private createSeatForm() {
    const form = this.formBuilder.group({
      ticketType: this.formBuilder.control('', [
        Validators.required
      ]),
    })
  return form;
  }

  dodajtest(seat:string,showId:number){
    this.seatForm.markAllAsTouched()
    if(this.seatForm.invalid){
      return 
    } else
    return this.seatForm.getRawValue(), console.log(seat,this.seatForm.value,showId)
  }

  isFormValid(){
   return this.seatForm.invalid
  }
  getShows() {
    return this.service.getRepertoire().subscribe((value) => {
      this.repertoire = value;
    });
  }

  getShowByDate(date: string) {
    return this.repertoire
      .filter((record) => {
        return date == record.date;
      })
      .pop();
  }

  getFilms() {
    return this.service.getShows().subscribe((value) => {
      this.shows = value;
    });
  }

  private properFilms(films: Film[]): testFilm[] {
    return films.map((films) => ({
      title: films.title,
      id: films.id,
      genre: films.genre,
    }));
  }
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  createNumbersArray(rows:number){
    let numbers = []
    for(let i=1; i<=rows; i++){
      numbers.push(i)
    } return numbers
    }

    displayProperAmmountOfLetters(letters: string[], rows:number){
      return letters.slice(0,rows)
    }

    displayProperAmmountOfNumbers(columns:number){
      numbersArray.filter(numbers => numbers <= columns)  
    }

  returnFilmsById(films: Film[], id: number) {
    return films.filter((films) => films.id === id);
  }

  returnScreenById(screen: Screens[],id:number){
    return screen.filter(screen => screen.id == id)
  }
  

  ngOnInit(): void {
    this.getShows();
    this.getFilms();
    // this.films$ = this.service.getFilms().pipe(
    //   map((films) => this.dataService.properFilms(films))
    
    this.temporaryReservedSeats$ = this.reservationService.temporaryReservedSeats$;
    this.show$ = this.service.getShowtest().pipe(
    map(value => value.filter(value=> value.id == 4))
    )
    this.films$ = this.service.getFilms()
    this.screen$ = this.service.getScreens()
    this.cart$ = this.cartService.cart$;
      // .pipe(map((films) => films.filter((films) => (films.id == 4))));

    // this.films$ = this.service.getFilms().pipe(
    //  (films) => {
    //   films.map(films => ({

    //   }))
    //  }
    // )
  }
  // filmById(films: Film[]){

  //    return films.map((films => films.filter(films => films.id >4)))

  // }

  // testComponent() {
  //   this.getFilmsByRepertoires(this.getShowByDate('28/02'));
  // }

  // getFilmsByShow() {
  //   return this.service.getFilms().subscribe((value) => {
  //     this.filmsAll = value;
  //   });
  // }

  //   )
  // }

  // getFilmsByShow(id:number){
  //  return this.service.getFilms().pipe(map(filter(response => response.id == id))).subscribe(
  //   response => console.log(response)
  // } )

  get vid$() {
    return this.service.getFilms();
  }
}

// login$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(AuthActions.login),
//     switchMap(({ loginData }) => {
//       const { email, password } = loginData;
//       return this.authService.login(email, password).pipe(
//         tap(({ accessToken }) => {
//           this.cookieService.set('token', accessToken, 1, '/');
//         }),
//         map(({ user }) => {
//           this.router.navigate(['']);
//           console.log('dupa')
//           return UserApiActions.getUserSuccess({ user });
//         }),
//         catchError(() => {
//           alert('Zły login lub hasło')
//           return of(AuthApiActions.loginFailure());
//         })
//       );
//     })
//   );
// });
// }

// this.films$ = this.service.getFilms().pipe(
//   map((films => films.filter(films => films.id>7)))
// )

// properFilms(films: Film[]) : testFilm[] {
//   return films.map((films) => ({
//     title: films.title,
//     id: films.id,
//     genre: films.genre
//   }))
//   }

// filmById(films : Film[]){
// return films.map((films)=>(films.filter(films=>films.id)))
// }
