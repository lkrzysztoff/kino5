import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { score } from '../scoredialog/score.interface';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private score$$ = new BehaviorSubject<score[]>([]);

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
}
