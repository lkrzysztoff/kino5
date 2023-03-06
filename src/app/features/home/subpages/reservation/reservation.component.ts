import {
  Component,
  ComponentFactoryResolver,
  createComponent,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmRepository } from '../../../../model/film.repository';
import { Film } from '../../../../model/film.model';
import { CartLine } from '../../../../model/cart.model';
import { Seat } from '../../../../model/seat.model';
import { priceType } from '../../../../model/show.model';
import { Observable, from } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Route } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DatePanelComponent } from '../../../../shared/ui-components/date-panel/date-panel.component';
import { id } from 'date-fns/locale';
import { NgClass } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { createInjectableType, ReturnStatement } from '@angular/compiler';
import { ReservationService } from './reservation.service';
import { Screen } from 'src/app/model/screen.model';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/test/cart.service';
import { Showtest } from 'src/app/test/test.component';
import { Cart } from 'src/app/test/cart-interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { testFilm } from 'src/app/test/test.component';
import { Screens } from 'src/app/test/test.component';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { Show } from '../../../../model/show.model';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TemporaryReserved } from './temporary-reserved.interface';
import { TestComponent } from 'src/app/test/test.component';
import { TicketTypeFormComponent } from 'src/app/features/home/subpages/reservation/ticket-type-form/ticket-type-form.component';

const numbersArray: number[] = [];

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    NgFor,
    NgIf,
    DatePipe,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    NgClass,
    TestComponent,
    TicketTypeFormComponent,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  http = inject(HttpClient);
  // selectedDate!: string;
  // showId: number = 0;
  // constructor(
  //   private filmsRepository: FilmRepository,
  activeRoute = inject(ActivatedRoute);
  //   public cart: Cart
  // ) {}

  // ngOnInit(): void {
  //   this.selectedDate = this.activeRoute.snapshot.params['selectedDate'];
  //   this.showId = this.activeRoute.snapshot.params['showId'];

  //   this.letters = this.screen
  //     ? this.lettersSh.slice(0, this.screen.rows)
  //     : this.lettersSh;
  //   // this.letters = this.screen
  //   this.numbers = this.screen
  //     ? this.numbersSh.slice(0, this.screen.colu)
  //     : this.numbersSh;
  // this.numbers = this.screen.column

  // obcinamy rzędzy foteli do wielkosci sali

  //   console.log(this.letters);
  //   console.log(this.screen.rows);
  //   console.log(this.numbers);
  //   console.log(this.screen.colu);

  //   this.seatDisplay();
  //   this.checkButton();
  // }

  // właściwości potrzebne do wyświetlenia wszystklich danych
  // get film() {
  //   return this.filmsRepository.getFilmByShow(this.showId);
  // }
  // z modelu Show trzeba pobrać miejsca już zarezerwowane
  // Show.reservedSeats
  // get show() {
  //   return this.filmsRepository.getShow(this.showId);
  // }

  // checkReserved(seat: string) {
  //   return this.show.reservedSeats.includes(seat);
  // console.log(seat)
  // }
  // get reserved(){

  // }
  // z modelu Screen trzeba pobrać miejsca specjalne i poszukamy zastosowania dla nich
  // Screen.specialSeats
  // get screen(): Screen {
  //   return this.filmsRepository.getScreenByShow(this.showId);
  // }

  // @ViewChild('ticketContainer', { read: ViewContainerRef }) container: any;
  // display: boolean = false;
  // letters: string[] = [];
  // numbers: number[] = [];
  // lettersSh = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  // numbersSh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // seats: any = [];
  // ticketCheck: boolean = false;
  // selectedSeat = 0;
  // selectedColumn = '';
  // actualVal: string = '';
  // check: boolean = false;
  // reservationBuffer: any = false;

  // seatReturn(i: number, a: number) {
  //   console.log(this.letters[a], i + 1);
  //   this.selectedColumn = this.letters[a];
  //   this.selectedSeat = i + 1;
  //   this.seats.push([this.selectedColumn, this.selectedSeat]);
  //   console.log(this.seats);
  //   this.reservationBuffer = {
  //     name: this.letters[a] + (i + 1),
  //     show_id: this.showId,
  //     date: this.selectedDate,
  //     priceType:
  //       this.show.priceList[0].type + ' ' + this.show.priceList[0].price,
  //     film: this.film?.title,
  //     reserved: this.show.reservedSeats,
  //   };
  //new seatBuffer(this.letters[a]+ (i+1),this.showId, this.selectedDate.toISOString().slice(0, 10), this.show.priceList[0].type+' '+this.show.priceList[0].price);
  // console.log('Buffer');
  // console.log(this.reservationBuffer);
  //   }

  //   addToReservationBuffer() {
  //     let priceTypeTemp: string[] = this.reservationBuffer.priceType.split(' ');
  //     let pType: priceType = {
  //       type: priceTypeTemp[0],
  //       price: Number(priceTypeTemp[1]),
  //     };
  //     this.cart.addLine(
  //       new Seat(
  //         this.reservationBuffer.name,
  //         this.reservationBuffer.show_id,
  //         this.reservationBuffer.date,
  //         pType
  //       )
  //     );
  //     this.clearReservationBuffer();
  //   }
  //   clearReservationBuffer() {
  //     this.reservationBuffer = false;
  //   }
  //   seatDisplay() {
  //     let testDate = this.selectedDate;
  //     return this.cart.lines.filter(
  //       (line) => line.seat.show_id == this.showId && line.seat.date == testDate
  //     );
  //   }
  //   clik() {
  //     console.log(this.letters);
  //   }
  //   ticket() {
  //     this.ticketCheck = !this.ticketCheck;
  //   }

  //   dest(ix: number) {
  //     this.seats.splice(ix, 1);
  //   }
  //   priceTypeChange(value: any) {
  //     this.reservationBuffer.priceType = value.target.value;
  //   }
  //   checkButton() {
  //     if (this.seats.length > 0) {
  //       this.check = true;
  //     }
  //   }
  //   prank() {
  //     console.log(this.seats);
  //   }

  //   addToReserved() {
  //     let seatString = this.seats.join('').split(',').join('');
  //     console.log('http post', seatString);

  //     this.http.get('http://localhost:3000/show/0/').subscribe((result) => {
  //       console.log(result);
  //     });
  //     console.log(this.cart);
  //   }
  //   baseUrl!: string;
  // }
  // export interface seatBuffer {
  //   name: string;
  //   show_id: number;
  //   date: string;
  //   priceType: string;
  // }

  service = inject(MainDataSource);
  reservationService = inject(ReservationService);
  repertoire!: repertoire[];
  shows!: Show[];
  dataService = inject(OrderManagmentService);
  formBuilder = inject(NonNullableFormBuilder);
  cartService = inject(CartService);

  selectedDate!: string;
  showId!: number;

  //   filmsAll!: Film[];
  //   films!: {title:string,id:number,genre:string}[];

  // films$ !: {title:string}
  // filmsSub !: Subscription

  films$!: Observable<Film[]>;
  show$!: Observable<Showtest[]>;
  screen$!: Observable<Screens[]>;
  cart$!: Observable<Cart[]>;
  temporaryReservedSeats$!: Observable<TemporaryReserved[]>;
  seatForm = this.createSeatForm();
  seat!: { ticketType: string };

  private createSeatForm() {
    const form = this.formBuilder.group({
      ticketType: this.formBuilder.control('', [Validators.required]),
    });
    return form;
  }

  checkIfFormIsFilled() {
    if (
      this.cartService.cart$$.value.length ==
        this.reservationService.temporaryReservedSeats$$.value.length &&
      this.reservationService.temporaryReservedSeats$$.value.length !== 0
    ) {
      return false;
    } else return true;
  }

  dodajtest(seat: string, showId: number) {
    this.seatForm.markAllAsTouched();
    if (this.seatForm.invalid) {
      return;
    } else return this.seatForm.getRawValue();
  }

  isFormValid() {
    return this.seatForm.invalid;
  }

  resetForm() {
    this.seatForm.reset();
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
    this.getShows();
    this.getFilms();

    this.selectedDate = this.activeRoute.snapshot.params['selectedDate'];
    this.showId = this.activeRoute.snapshot.params['showId'];

    // this.films$ = this.service.getFilms().pipe(
    //   map((films) => this.dataService.properFilms(films))

    this.temporaryReservedSeats$ =
      this.reservationService.temporaryReservedSeats$;

    this.show$ = this.service.getShowtest();
    this.films$ = this.service.getFilms();
    this.screen$ = this.service.getScreens();
    this.cart$ = this.cartService.cart$;
    // .pipe(map((films) => films.filter((films) => (films.id == 4))));

    // this.films$ = this.service.getFilms().pipe(
    //  (films) => {
    //   films.map(films => ({

    //   }))
    //  }
    // )
  }

  returnShowById(shows: Showtest[], id: number) {
    return shows.filter((shows) => shows.id == id);
  }

  filterTemporaryReservedByShowId(value: TemporaryReserved[], id: number) {
    return value.filter((value) => value.showId == id);
  }
}
