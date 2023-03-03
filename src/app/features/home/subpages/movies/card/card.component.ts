import { Component, inject, OnInit } from '@angular/core';
import { FilmRepository } from '../../../../../model/film.repository';
import { Film } from '../../../../../model/film.model';
import { Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { MyfavlistService } from 'src/app/features/home/subpages/favlist/myfavlist.service';
import { ScoredialogComponent } from '../scoredialog/scoredialog.component';
import { score } from '../scoredialog/score.interface';
import { ScoreService } from './score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card[films][selectedDate]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() films!: Film;
  @Input() selectedDate!: string;

  scoreService = inject(ScoreService);
  public service = inject(MyfavlistService);
  public dialog = inject(MatDialog);
  private store = inject(Store);
  private filmService = inject(FilmRepository);

  score$!: Observable<score[]>;
  user$ = this.store.select(selectLoggedUser);
  isReadMore = true;
  importedDialogData!: number;

  getShows(filmId: number) {
    return this.filmService.getFilmShows(filmId);
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  ngOnInit(): void {
    this.score$ = this.scoreService.score$;
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
}
