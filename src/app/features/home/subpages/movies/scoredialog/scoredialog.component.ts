import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ScoreService } from '../card/movie-score-service/score.service';
import { DialogData } from './score.interface';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './scoredialog.component.html',
  styleUrls: ['./scoredialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoredialogComponent {
  scoreService = inject(ScoreService);

  text = new FormControl('', [Validators.maxLength(50)]);
  private dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
