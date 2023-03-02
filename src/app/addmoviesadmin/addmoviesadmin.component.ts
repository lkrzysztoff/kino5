import { Component,inject } from '@angular/core';
import { NonNullableFormBuilder,FormControl, Validators } from '@angular/forms';
import { MainDataSource } from '../model/main.datasource.service';
import { HttpClient } from '@angular/common/http';
import { Film } from '../model/film.model';
import { movie } from './movie.interface';
import { NumberMaxLengthDirective } from '../shared/guards/directives/numbermaxlength.directive';

@Component({
  selector: 'app-addmoviesadmin',
  templateUrl: './addmoviesadmin.component.html',
  styleUrls: ['./addmoviesadmin.component.scss']
})
export class AddmoviesadminComponent {
private formBuilder = inject (NonNullableFormBuilder)
public service = inject (MainDataSource)
movieFormValue!: movie

movieForm = this.createMovieForm();

private createMovieForm(){
const form = this.formBuilder.group({
  img: this.formBuilder.control('',[

  ]),
  title: this.formBuilder.control('',[
    
  ]),
  description: this.formBuilder.control('',[

  ]),
  genre: this.formBuilder.control('',[

  ]),
  ageRest: this.formBuilder.control('',[

  ]),
  date: this.formBuilder.control('',[

  ]),
  hour: this.formBuilder.control('',[

  ]),
  length: this.formBuilder.control('',[

  ]),
  score: this.formBuilder.control('',[

  ]),
  premier: this.formBuilder.control('',[

  ])
})
return form;
}

addMovieFormSubmit(){
  this.movieForm.markAllAsTouched();
  if (this.movieForm.invalid) {
    return;
  } this.service.adminAddMovie(this.movieForm.getRawValue()).subscribe(
    value => {
      alert("Dodano film pod tytułem " + value.title)
    }
  )
    // alert("Dodano film do bazy")
    // this.movieForm.markAsUntouched(),
    // this.movieForm.reset()
}

shows$ = this.service.getShows();

}