import { Component, ElementRef,  ViewChild,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userPosts } from '../../../../app.module';
import { FilmRepository } from '../../../../model/film.repository';
import { Film } from '../../../../model/film.model';
import { take } from 'rxjs';
import { ActivatedRoute } from "@angular/router"; 
import {  Input, Output,EventEmitter } from '@angular/core'




@Component({
  selector: 'app-card[films]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent  {
  @Input() films! : Film;
 @Input() selectedDate !: Date;

  isReadMore = true;
 
  

  
 
  constructor(private filmsRepository: FilmRepository) {
  }
  
  // get films() : Film[] {
  //     return this.filmsRepository.getFilms( this.selectedDate );
  // }
  getShows( filmId: number ) {
      return this.filmsRepository.getFilmShows( filmId );
  }
  showText() {
     this.isReadMore = !this.isReadMore

  }
  
}
