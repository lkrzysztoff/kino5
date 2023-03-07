import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';

@Injectable({
  providedIn: 'root',
})
export class AdminMovieService {
  public service = inject(FilmService);
}
