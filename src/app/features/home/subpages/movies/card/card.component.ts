import { Component, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Film } from '../../../../../shared/interfaces/film.interface';
import { Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { MywatchlistService } from 'src/app/features/home/subpages/watchlist/watchlist-service/mywatchlist.service';
import { ScoredialogComponent } from '../scoredialog/scoredialog.component';
import { MyRating, score } from '../scoredialog/score.interface';
import { ScoreService } from './movie-score-service/score.service';
import { Observable } from 'rxjs';
import { FilmService } from '../film-service/film-service';
import { Showtest } from '../../reservation/reservation-grid/reservation-interfaces';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card[films][selectedDate][oneDayRepertoireShows]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() films!: Film;
  @Input() selectedDate!: string;
  @Input() showId!: number;
  @Input() oneDayRepertoireShows!: number[];

  scoreService = inject(ScoreService);
  public service = inject(MywatchlistService);
  public dialog = inject(MatDialog);
  private store = inject(Store);
  private filmService = inject(FilmService);
 
  score$!: Observable<score[]>;
  user$ = this.store.select(selectLoggedUser);
  isReadMore = true;
  importedDialogData!: number;
  usersRating$ !: Observable<MyRating[]>

  shows$!: Observable<Showtest[]>;
  showText() {
    this.isReadMore = !this.isReadMore;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.usersRating$ = this.scoreService.getRating()
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

  returnShowById(shows: Showtest[], id: number, selectedDate: string) {
    return shows.filter(
      (value) =>
        value.filmId == id && this.oneDayRepertoireShows.includes(value.id)
    );
  }

  filterRatingById(rating:MyRating[] , id:number){
    return rating.filter(value => value.filmId == id)
  }
  displayRating(argument:number){
    if(argument){
      return argument;
    } else return 'Oceń ten film'
  }
}
