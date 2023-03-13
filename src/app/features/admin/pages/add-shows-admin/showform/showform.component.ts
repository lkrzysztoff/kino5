import {
  Component,
  Input,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { repertoire, showformInput } from './showform.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-interfaces';
import { Validators } from '@angular/forms';
import { AdminFilmService } from '../../../services/admin-film.service';
import { addShowInterface } from '../../../store/admin.interfaces';
import { Screen } from 'src/app/shared/interfaces/screen.interface';
import { Store } from '@ngrx/store';
import { addShowsActions } from '../../../store/admin.actions';

const PROTOCOL = 'http';
const PORT = 3000;

@Component({
  selector: 'app-showform[data]',
  templateUrl: './showform.component.html',
  styleUrls: ['./showform.component.scss'],
})
export class ShowformComponent implements OnInit, OnChanges {
  http = inject(HttpClient);
  formBuilder = inject(NonNullableFormBuilder);
  @Input() data!: showformInput;
  private adminService = inject(AdminFilmService);
  private store = inject(Store);

  shows$!: Observable<Showtest[]>;
  films$!: Observable<Film[]>;
  repertoire$!: Observable<repertoire[]>;
  baseUrl!: string;
  normalPricelist!: Array<{ type: string; price: number }>;
  constructor() {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  defaultScreenId!: number;
  ngOnChanges(changes: SimpleChanges): void {
    this.defaultScreenId = this.data?.screen;
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
  filterShowById(shows: Showtest[], id: number, screen: number) {
    return shows.filter((shows) => shows.id === id && shows.screen == screen);
  }

  showForm = this.createForm();
  private createForm() {
    return this.formBuilder.group({
      filmId: this.formBuilder.control<number>(NaN, {
        validators: [Validators.required],
      }),
      hour: this.formBuilder.control<string>('', {
        validators: [Validators.required],
      }),
      date: this.formBuilder.control('', {
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
      reservedSeats: this.formBuilder.control([''], {
        validators: [Validators.required],
      }),
      screen: this.formBuilder.control<number>(NaN, {
        validators: [Validators.required],
      }),
    });
  }

  newshowid!: number;

  submit(repertoire: repertoire, films: Film[], shows: Showtest[]) {
    this.showForm.markAllAsTouched();
    const show = this.showForm.getRawValue();
    show.screen = this.data.screen;
    if (this.showForm.invalid) {
      return;
    } else {
      this.showForm.controls.screen.setValue(this.data.screen);
      if (
        !this.compareTime(this.showForm.getRawValue(), repertoire, films, shows)
      ) {
        alert('Nie można dodać filmu, gdyż ten termin jest już zajęty!');
        return;
      }
      this.addShow(repertoire);
    }
    const me = this;
    setTimeout(function () {
      me.reloadRepertoire();
    }, 100);
  }

  addShow(repertoire: repertoire) {
    const show = this.showForm.getRawValue();
    show.screen = this.data.screen;
    this.store.dispatch(
      addShowsActions.addOneShow({ shows: show, repertoire: repertoire })
    );
  }

  reloadRepertoire() {
    this.repertoire$ = this.getRepertoire();
    this.shows$ = this.getShows();
  }

  ngOnInit(): void {
    this.reloadRepertoire();
    this.getFilms();
    this.repertoire$ = this.getRepertoire();
    this.shows$ = this.getShows();
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
    const film = films.filter((value) => value.id == form.filmId).pop();
    const startNewShow = this.convertTime(form.hour);
    const endNewShow = startNewShow + (film ? parseInt(film.length) : 120) + 15;
    let exists = false;
    repertoire.shows.forEach((showId) => {
      if (exists) {
        return;
      }
      const showArray = shows.filter(
        (element) => element.id == showId && element.screen == form.screen
      );
      if (!showArray.length) {
        return;
      }
      const show = showArray.pop();
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

  filteredRepertoire$!: Observable<repertoire>;

  activateRepertoire() {
    if (this.data.date) {
      this.filteredRepertoire$ = this.adminService.getRepertoireByDate(
        this.data.date
      );
    } else return;
  }

  screen$!: Observable<Screen>;
  filterShowsByScreen(shows: Showtest[], screen: number) {
    return shows.filter((shows) => shows.screen === screen);
  }
}
