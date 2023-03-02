import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
  Injectable,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { userPosts } from '../../../../app.module';
import { FilmRepository } from '../../../../model/film.repository';
import { Film } from '../../../../model/film.model';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MyfavlistService } from 'src/app/shared/pages/favlist/myfavlist.service';
import { Cart } from 'src/app/model/cart.model';
import { CookieService } from 'ngx-cookie-service';
import { NgModel } from '@angular/forms';
import { ScoredialogComponent } from './scoredialog/scoredialog.component';
import { DialogData } from './scoredialog/score.interface';
import { ScoreService } from './score.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card[films]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  @Input() films!: Film;
  @Input() selectedDate!: Date;

  animal!: string;

  score!: number;

  isReadMore = true;
  public cart = inject(Cart);
  public service = inject(MyfavlistService);
  private store = inject(Store);
  user$ = this.store.select(selectLoggedUser);
  cs = inject(CookieService);

  // openDialog() : void {
  //   const dialogRef = this.dialog.open(ScoredialogComponent, {
  //     data: {
  //       score : this.score
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result =>{
  //     this.score = result;
  //     console.log(this.score)
  //   }

  constructor(private filmsRepository: FilmRepository) {}

  // get films() : Film[] {
  //     return this.filmsRepository.getFilms( this.selectedDate );
  // }
  getShows(filmId: number) {
    return this.filmsRepository.getFilmShows(filmId);
  }
  showText() {
    this.isReadMore = !this.isReadMore;
  }
  ngOnInit(): void {
    //  this.cs.delete('token');
  }
  check() {
    this.cs.deleteAll();
  }

  public dialog = inject(MatDialog);
  importedDialogData!: number;

  openDialog(): void {
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
  scoreService = inject(ScoreService);
  score$ = this.scoreService.score$;

  

  ngOnDestroy(): void {}
}
