import { Component, ElementRef,  ViewChild,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userPosts } from '../app.module';
import { FilmRepository } from '../model/film.repository';
import { Film } from '../model/film.model';
import { take } from 'rxjs';
import { ActivatedRoute } from "@angular/router"; 
import {  Input, Output,EventEmitter } from '@angular/core'




@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent  {

  isReadMore = true;
  godziny = ['12:30','15:30','16:30'];
  selectedDate : Date = new Date();
  str : string = 'dsds';
  
  dateImport( newDate : any ) {
    this.selectedDate = newDate;
	}
  constructor(private filmsRepository: FilmRepository) {
  }
  
  get films() : Film[] {
      return this.filmsRepository.getFilms( this.selectedDate );
  }
  getShows( filmId: number ) {
      return this.filmsRepository.getFilmShows( filmId );
  }
  showText() {
     this.isReadMore = !this.isReadMore
  }
  
}
