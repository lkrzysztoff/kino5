import {
  Component,
  OnInit,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FilmRepository } from '../../../model/film.repository';
import { Film } from '../../../model/film.model';
import { CardComponent } from '../../ui/movies/card/card.component';
import { DatePanelComponent } from '../../ui/components/date-panel/date-panel.component';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { filter } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../../ui/orders/order/user';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { Show } from 'src/app/model/show.model';
import { repertoire } from 'src/app/addshowsadmin/showform/showform.interface';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';
import { OrderManagmentService } from 'src/app/order-managment.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  isReadMore = true;
  godziny = ['12:30', '15:30', '16:30'];
  selectedDate!: string;
  service = inject(MainDataSource);
  orderManagmentService = inject(OrderManagmentService);
  chosenDate !: string;

  testdate = new Date()

  // films$ = this.service.getfilms()

  //   film! : Film[];
  //   constructor(private filmsRepository: FilmRepository) {

  //    }

  //    get films() : Film[] {
  //     return this.filmsRepository.getFilms(this.selectedDate);
  // }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  dateImport(newDate: Date) {
    this.selectedDate = this.convertDateToString(newDate);
    // if (!this.films) {
    //   let me = this;
    //   setTimeout(function () {
    //     me.testComponent.call(me);
    //   }, 100);
    // } else this.testComponent();
  }

  // dateConver() {
  //   console.log(this.selectedDate.toDateString());
  //   const today = this.selectedDate;
  //   const yyyy = today.getFullYear();
  //   let mm: any = today.getMonth() + 1; // Months start at 0!
  //   let dd: any = today.getDate();

  //   if (dd < 10) dd = '0' + dd.toString();
  //   if (mm < 10) mm = '0' + mm.toString();

  //   const formattedToday = dd + '/' + mm;
  //   return formattedToday;
  // }
  // ngOnInit(): void {

  // }

  repertoire!: repertoire[];
  shows!: Show[];
  filmsAll!: Film[];
  films!: Film[];
  repertoire$!: Observable<repertoire[]>;
  films$ = this.service.getFilms();

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

  ngOnInit(): void {
    this.getShows();
    this.getFilms();
    this.getFilmsByShow();
    this.repertoire$ = this.service.getRepertoire();
    // this.films$ = this.service.getFilms()
  }

  // testComponent() {
  //   this.getFilmsByRepertoires(this.getShowByDate(this.dateConver()));
  // }

  getFilmsByShow() {
    return this.service.getFilms().subscribe((value) => {
      this.filmsAll = value;
    });
  }

  //   )
  // }

  // getFilmsByShow(id:number){
  //  return this.service.getFilms().pipe(map(filter(response => response.id == id))).subscribe(
  //   response => console.log(response)
  // } )

  getFilmsByRepertoires(repertoire: any) {
    this.films = this.filmsAll.filter(
      (film) =>
        this.getFilmsByRepertoire(repertoire)
          .map((r) => r.filmId)
          .indexOf(film.id) >= 0
    );
  }

  // filmById(films : Film[]){
  // return films.map((films)=>(films.filter(films=>films.id)))
  // }

  klik() {
    // this.testComponent();
  }

  mockArray = [1,2,3,4]

  mockDate = "03/03"

  getRepertoireByDate(repertoire : repertoire[], date: string){
    return repertoire.filter(repertoire => repertoire.date === date)
  }

  returnFilmsById(films : Film[],id: number){
    return films.filter(films => films.id === id)
  }

  convertDateToString(date: Date){
    const today = date;
    const yyyy = today.getFullYear();
    let mm : string | number = today.getMonth() + 1; // Months start at 0!
    let dd: string | number = today.getDate();
    if (dd < 10) dd = '0' + dd.toString();
    if (mm < 10) mm = '0' + mm.toString();
    const formattedToday = dd + '/' + mm;
    return formattedToday;
  }

  testklik(){
    
  }

}
