import { Component, Input, inject, OnInit } from '@angular/core';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';
import { repertoire, showformInput } from './showform.interface';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { movie } from '../../add-movies-admin/movie.interface';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Validators } from '@angular/forms';

import { ofType } from '@ngrx/effects';
import { AdminFilmService } from '../../../services/admin-film.service';
import { addShowInterface } from '../add-shows-admin';
import { id } from 'date-fns/locale';



const PROTOCOL = 'http';
const PORT = 3000;


export interface showform {
date:any,
movieId:any,
hour:any
}


@Component({
  selector: 'app-showform',
  templateUrl: './showform.component.html',
  styleUrls: ['./showform.component.scss'],
})
export class ShowformComponent implements OnInit {
  http = inject(HttpClient);
  formBuilder = inject(NonNullableFormBuilder);
  @Input() data!: showformInput;
  private adminService = inject(AdminFilmService)
  
  shows$ !: Observable<Showtest[]>
  films$!: Observable<Film[]>;
  repertoire$ !: Observable<repertoire[]>
  baseUrl!: string;

  constructor() {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getRepertoire() {
    return this.http.get<repertoire[]>(this.baseUrl + 'repertoire');
  }

  getShows(){
    return this.http.get<Showtest[]>(this.baseUrl+'show')
  }

  getFilms() {
    this.films$ = this.http.get<Film[]>(this.baseUrl + 'films');
  }

  filterRepertoireByDate(repertoire: repertoire[], date:string){
    return repertoire.filter((repertoire) => repertoire.date === date);
  }

  filterShowsByScreen(shows: Showtest[], screen:number){
    return shows.filter((shows) => shows.screen === screen)
  }
  filterShowById(shows: Showtest[],id:number,screen:number){
    return shows.filter(shows => shows.id === id&&shows.screen == screen)
  }
  showForm = this.createForm()
  private createForm() {
    return this.formBuilder.group({
      filmId: this.formBuilder.control(NaN, {
        validators: [Validators.required],
      }),
      hour: this.formBuilder.control<string>('', {
        validators: [Validators.required],
      }),
      date: this.formBuilder.control('d', {
        validators: [],
      }),
      priceList: this.formBuilder.control([{
        "type": "Normalny",
        "price": 30
      },
      {
        "type": "Ulgowy",
        "price": 15
      },
      {
        "type": "Voucher",
        "price": 20
      }], {
        validators: [Validators.required],
      }),
      reservedSeats:this.formBuilder.control(['A10'],{
        validators: [Validators.required],
      }),
      screen:this.formBuilder.control(2,{
        validators: [Validators.required],
      })
    });
  }
  newshowid !: number
  afterReturn(show: addShowInterface,repertoire:repertoire){
    const showId = (show.id ? show.id : 0 );
    if(!repertoire.shows.includes(showId)){
      repertoire.shows.push(showId);
      this.http.put<repertoire>(this.baseUrl+'repertoire/'+repertoire.id,repertoire).subscribe(
        value => console.log(value)
      )
    }
    console.log(show,repertoire);
  }
  submit(repertoire: repertoire){
    this.showForm.markAllAsTouched()
    if(this.showForm.invalid) {
      return;
    } else console.log(this.showForm.value),this.addShow().subscribe(value => this.afterReturn(value,repertoire))
  }

  ngOnInit(): void {
    this.getFilms();
    this.repertoire$ = this.getRepertoire()
    this.shows$ = this.getShows()
  }
  newId !: {
    hour: string;
  screen: number;
  reservedSeats: string[];
  priceList: { type: string; price: number }[];
  filmId: number;
  id:number
  }
  addShow(){
    const show = this.showForm.getRawValue()
    return this.adminService.adminAddShow(show)
  }
  //jezeli nie ma repertuaru, to wtedy uzywamy posta do stworzenia nowego repertuaru
  onSubmit(repertoire: repertoire){
    const formValue = this.showForm.getRawValue();
    if(!repertoire){

    } else {

    }
  }
  
  addToRepertoire(repertoireId:number,showId:number,date:string){
    const repertoireDTO = {
      showId:showId
    }
    return this.http.post<repertoire>(this.baseUrl+'repertoire/shows'+repertoireId,repertoireDTO)
  }
  
  klik(){
    console.log(this.newId)
  }

}
