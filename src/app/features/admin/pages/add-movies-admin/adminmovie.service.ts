import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainDataSource } from '../../../../model/main.datasource.service';

@Injectable({
  providedIn: 'root',
})
export class AdminMovieService {
  public service = inject(MainDataSource);
}
