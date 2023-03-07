import { Component, inject, OnInit } from '@angular/core';
import { Film } from '../../../../../shared/interfaces/film.interface';
import { Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { MywatchlistService } from 'src/app/features/home/subpages/watchlist/watchlist-service/mywatchlist.service';
import { ScoredialogComponent } from '../scoredialog/scoredialog.component';
import { score } from '../scoredialog/score.interface';
import { ScoreService } from './movie-score-service/score.service';
import { Observable } from 'rxjs';
import { FilmService } from '../film-service/film-service';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';

@Component({
  selector: 'app-card[films][selectedDate]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() films!: Film;
  @Input() selectedDate!: string;
  @Input() showId!: number;

  scoreService = inject(ScoreService);
  public service = inject(MywatchlistService);
  public dialog = inject(MatDialog);
  private store = inject(Store);
  filmService = inject(FilmService);

  score$!: Observable<score[]>;
  user$ = this.store.select(selectLoggedUser);
  isReadMore = true;
  importedDialogData!: number;

  shows$!: Observable<Showtest[]>;
  showText() {
    this.isReadMore = !this.isReadMore;
  }

  ngOnInit(): void {
    this.score$ = this.scoreService.score$;
    this.shows$ = this.filmService.getShowtest();
  }

  openScoreDialog(): void {
    const dialogRef = this.dialog.open(ScoredialogComponent, {
      data: {
        title: this.films.id,
        buttonText: 'Wyślij prośbę',
        inputLabelText: 'Example label',
        importedDialogData: this.importedDialogData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.importedDialogData = result;
    });
  }

  returnShowById(shows: Showtest[], id: number) {
    return shows.filter((value) => value.filmId == id);
  }
}
