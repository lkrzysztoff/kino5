import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
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
        whitespaceValidator,
        Validators.required
      ]),
      title: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      description: this.formBuilder.control('', [
        Validators.required
        ,whitespaceValidator
      ]),
      genre: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      ageRest: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      date: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      hour: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      length: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      score: this.formBuilder.control('', [
        whitespaceValidator,
        Validators.required
      ]),
      premier: this.formBuilder.control('', []),
    });
    return form;
  }

  addMovieFormSubmit() {
   
    this.store.dispatch(
      addFilmsActions.addOneMovie({ films: this.movieForm.getRawValue() })
    )
  }

  // shows$ = this.service.getShows();
}
