import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';
import { HttpClient } from '@angular/common/http';
import { Film } from '../../../../shared/interfaces/film.interface';
import { movie } from './movie.interface';
import { NumberMaxLengthDirective } from '../../../../shared/guards/directives/numbermaxlength.directive';
import { AdminFilmService } from '../../services/admin-film.service';
import { Store } from '@ngrx/store';
import { addFilmsActions } from '../../store/admin.actions';
import { whitespaceValidator } from 'src/app/features/auth/subpages/signin/validators';

@Component({
  selector: 'app-addmoviesadmin',
  templateUrl: './addmoviesadmin.component.html',
  styleUrls: ['./addmoviesadmin.component.scss'],
})
export class AddmoviesadminComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  public service = inject(AdminFilmService);
  movieFormValue!: movie;
  private store = inject (Store)
  movieForm = this.createMovieForm();
  admin$ = this.store.select('AdminFilm')

  private createMovieForm() {
    const form = this.formBuilder.group({
      img: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      title: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      description: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      genre: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      ageRest: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      date: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      hour: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      length: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      score: this.formBuilder.control('', [
        whitespaceValidator
      ]),
      premier: this.formBuilder.control('', []),
    });
    return form;
  }

  addMovieFormSubmit() {
   
    this.store.dispatch(
      addFilmsActions.addSingleFilm({ films: this.movieForm.getRawValue() })
    )
  }

  // shows$ = this.service.getShows();
}
