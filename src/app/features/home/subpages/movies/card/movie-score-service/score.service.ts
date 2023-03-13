import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { score } from '../../scoredialog/score.interface';
import { MyRating } from '../../scoredialog/score.interface';
@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private score$$ = new BehaviorSubject<score[]>([]);
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/';

  get score$() {
    return this.score$$.asObservable();
  }

  addScore(score: { id: number; score: number }) {
    this.score$$.next([...this.score$$.value, score]);
  }

  removeScore(scoreId: number) {
    this.score$$.next(this.score$$.value.filter(({ id }) => id !== scoreId));
  }

  hasScore(scoreId: number): boolean {
    return this.score$$.value.some(({ id }) => id === scoreId);
  }

  sendRatingToDB(ratingDTO : MyRating){
    return this.http.post<MyRating>(this.apiUrl+'rating',ratingDTO)
  }

  getRating(){
    return this.http.get<MyRating[]>(this.apiUrl+'rating')
  }
}
