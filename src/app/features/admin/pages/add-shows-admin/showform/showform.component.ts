import { Component, Input, inject, OnInit } from '@angular/core';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';
import { repertoire, showformInput } from './showform.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-interfaces';
import { Validators } from '@angular/forms';

import { AdminFilmService } from '../../../services/admin-film.service';
import { addShowInterface } from '../add-shows-admin';


const PROTOCOL = 'http';
const PORT = 3000;

@Component({
  selector: 'app-showform[data]',
  templateUrl: './showform.component.html',
  styleUrls: ['./showform.component.scss'],
})
export class ShowformComponent implements OnInit {
  http = inject(HttpClient);
  formBuilder = inject(NonNullableFormBuilder);
  @Input() data!: showformInput;
  private adminService = inject(AdminFilmService);

  shows$!: Observable<Showtest[]>;
  films$!: Observable<Film[]>;
  repertoire$!: Observable<repertoire[]>;
  baseUrl!: string;

  constructor() {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getRepertoire() {
    return this.http.get<repertoire[]>(this.baseUrl + 'repertoire');
  }

  getShows() {
    return this.http.get<Showtest[]>(this.baseUrl + 'show');
  }

  getFilms() {
    this.films$ = this.http.get<Film[]>(this.baseUrl + 'films');
  }

  filterRepertoireByDate(repertoire: repertoire[], date: string) {
    return repertoire.filter((repertoire) => repertoire.date === date);
  }

  filterShowsByScreen(shows: Showtest[], screen: number) {
    return shows.filter((shows) => shows.screen === screen);
  }
  filterShowById(shows: Showtest[], id: number, screen: number) {
    return shows.filter((shows) => shows.id === id && shows.screen == screen);
  }

  showForm = this.createForm();
  private createForm() {
    return this.formBuilder.group({
      filmId: this.formBuilder.control(NaN, {
        validators: [Validators.required],
      }),
      hour: this.formBuilder.control<string>('', {
        validators: [Validators.required],
      }),
      date: this.formBuilder.control('decodeURI', {
        validators: [],
      }),
      priceList: this.formBuilder.control(
        [
          {
            type: 'Normalny',
            price: 30,
          },
          {
            type: 'Ulgowy',
            price: 15,
          },
          {
            type: 'Voucher',
            price: 20,
          },
        ],
        {
          validators: [Validators.required],
        }
      ),
      reservedSeats: this.formBuilder.control(['A10'], {
        validators: [Validators.required],
      }),
      screen: this.formBuilder.control(1, {
        validators: [Validators.required],
      }),
    });
  }
  newshowid!: number;
  afterReturn(show: addShowInterface, repertoire: repertoire) {
    const showId = show.id ? show.id : 0;
    if (!repertoire.shows.includes(showId)) {
      repertoire.shows.push(showId);
      this.http
        .put<repertoire>(
          this.baseUrl + 'repertoire/' + repertoire.id,
          repertoire
        )
        .subscribe((value) => console.log(value));
    }
    console.log(show, repertoire);
  }
  submit(repertoire: repertoire, films: Film[], shows: Showtest[]) {
    this.showForm.markAllAsTouched();
    if (this.showForm.invalid) {
      return;
    } else {
      if (
        !this.compareTime(this.showForm.getRawValue(), repertoire, films, shows)
      ) {
        alert('Nie można dodać filmu, gdyż ten termin jest już zajęty!');
        return;
      }
      this.showForm.value.screen = this.data.sala;
      console.log(this.showForm.value),
        this.addShow().subscribe((value) => {
          console.log('a');
          console.log(value);
          console.log('b');
          this.afterReturn(value, repertoire);
        });
    }
  }

  ngOnInit(): void {
    this.getFilms();
    this.repertoire$ = this.getRepertoire();
    this.shows$ = this.getShows();
    this.convertTime('02:01');
  }
  newId!: {
    hour: string;
    screen: number;
    reservedSeats: string[];
    priceList: { type: string; price: number }[];
    filmId: number;
    id: number;
  };
  addShow() {
    const show = this.showForm.getRawValue();
    show.screen = this.data.sala;
    return this.adminService.adminAddShow(show);
  }
  //jezeli nie ma repertuaru, to wtedy uzywamy posta do stworzenia nowego repertuaru
  onSubmit(repertoire: repertoire) {
    const formValue = this.showForm.getRawValue();
    if (!repertoire) {
    } else {
    }
  }

  addToRepertoire(repertoireId: number, showId: number, date: string) {
    const repertoireDTO = {
      showId: showId,
    };
    return this.http
      .post<repertoire>(
        this.baseUrl + 'repertoire/shows' + repertoireId,
        repertoireDTO
      )
      .subscribe((value) => console.log(value));
  }
  convertTime(time: string) {
    const splitedTime = time.split(':');
    return parseInt(splitedTime[0]) * 60 + parseInt(splitedTime[1]);
  }

  compareTime(
    form: addShowInterface,
    repertoire: repertoire,
    films: Film[],
    shows: Showtest[]
  ) {
    const film = films.filter((value) => (value.id = form.filmId)).pop();
    const startNewShow = this.convertTime(form.hour);
    const endNewShow = startNewShow + (film ? parseInt(film.length) : 120) + 15;
    let exists = false;
    repertoire.shows.forEach((showId) => {
      if (exists) {
        return;
      }
      const show = shows.filter((element) => element.id == showId).pop();
      const startShow = this.convertTime(show ? show.hour : '06:00');
      const film = films.filter((element) => element.id == show?.filmId).pop();
      const endShow = startShow + (film ? parseInt(film.length) : 120) + 15;
      if (startNewShow > endShow) {
        return;
      } else if (endNewShow < startShow) {
        return;
      } else {
        exists = true;
      }
    });
    return !exists;
  }
}
