import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addShowInterface } from '../store/admin.interfaces';
 
@Injectable({ providedIn: 'root' })
export class ShowsService {
  constructor(private http: HttpClient) {}
 
  getShows(): Observable<Array<addShowInterface>> {
    return this.http
      .get<{ items: addShowInterface[] }>(
        `http://localhost:3000/show`
      )
      .pipe(map((shows) => shows.items || []));
  }
}