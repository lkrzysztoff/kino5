import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../../../shared/interfaces/film.interface';
import { Observable, from } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ReservationService } from './reservation-service/reservation.service';
import { FilmService } from '../movies/film-service/film-service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { testFilm } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Screens } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Validators } from '@angular/forms';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { Show } from '../../../../shared/interfaces/show.interface';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TemporaryReserved } from './temporary-reserved.interface';
import { TestComponent } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { TicketTypeFormComponent } from 'src/app/features/home/subpages/reservation/ticket-type-form/ticket-type-form.component';
import { HttpClient } from '@angular/common/http';

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
  activeRoute = inject(ActivatedRoute);
  service = inject(FilmService);
  reservationService = inject(ReservationService);
  repertoire!: repertoire[];
  shows!: Show[];
  dataService = inject(OrderManagmentService);
  formBuilder = inject(NonNullableFormBuilder);
  cartService = inject(CartService);
  private http = inject(HttpClient)

  selectedDate!: string;
  showId!: number;

  films$!: Observable<Film[]>;
  show$!: Observable<Showtest[]>;
  screen$!: Observable<Screens[]>;
  cart$!: Observable<Cart[]>;

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
    this.selectedDate = this.activeRoute.snapshot.params['selectedDate'];
    this.showId = this.activeRoute.snapshot.params['showId'];

    this.show$ = this.service.getShowtest();
    this.films$ = this.service.getFilms();
    this.screen$ = this.service.getScreens();
    this.cart$ = this.cartService.cart$;
  }

  returnShowById(shows: Showtest[], id: number) {
    return shows.filter((shows) => shows.id == id);
  }

  reserveSeats(cart:Cart[],show: Showtest){
    const seatArray: string[] = []
    console.log(show)
    cart.forEach((element) => {
      if (show.reservedSeats.indexOf(element.id)<0){
        show.reservedSeats.push(element.id)
      } 
      this.http.put<Showtest>('http://localhost:3000/show/'+this.showId,show).subscribe(
        value => console.log(value)
      )
      // seatArray.push(element.id)
    })
    console.log(seatArray)
  }
}