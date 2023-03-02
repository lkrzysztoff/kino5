import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { repertoire } from '../features/admin/pages/add-shows-admin/showform/showform.interface';
import { MainDataSource } from '../model/main.datasource.service';
import { Film } from '../model/film.model';
import { Show } from '../model/show.model';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { OrderManagmentService } from '../order-managment.service';
import { FilmRepository } from '../model/film.repository';

export interface testFilm {
  title: string;
  id: number;
  genre: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  service = inject(MainDataSource);
  repertoire!: repertoire[];
  shows!: Show[];
  dataService = inject(OrderManagmentService);

  //   filmsAll!: Film[];
  //   films!: {title:string,id:number,genre:string}[];

  // films$ !: {title:string}
  // filmsSub !: Subscription

  films$!: Observable<testFilm[]>;

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

  getFilmsByRepertoire(repertoire: any) {
    return this.shows.filter((record) => {
      return repertoire.shows.indexOf(record.id) >= 0;
    });
  }

  private properFilms(films: Film[]): testFilm[] {
    return films.map((films) => ({
      title: films.title,
      id: films.id,
      genre: films.genre,
    }));
  }

  ngOnInit(): void {
    this.getShows();
    this.getFilms();

    // this.films$ = this.service.getFilms().pipe(
    //   map((films) => this.dataService.properFilms(films))
    // )

    this.films$ = this.service
      .getFilms()
      .pipe(map((films) => films.filter((films) => (films.id = 4))));

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
