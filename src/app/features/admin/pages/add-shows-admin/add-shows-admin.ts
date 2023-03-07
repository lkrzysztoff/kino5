import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';
import { showformInput } from './showform/showform.interface';
import { format } from 'date-fns';
import { AdminFilmService } from '../../services/admin-film.service';

export interface addShowInterface {
  hour: string;
  screen: number;
  reservedSeats: string[];
  priceList: { type: string; price: number }[];
  filmId: number;
  id?:number
}

@Component({
  selector: 'app-addshowsadmin',
  templateUrl: './add-shows-admin.component.html',
  styleUrls: ['./add-shows-admin.scss'],
})
export class AddshowsadminComponent implements OnInit {
  formBuilder = inject(NonNullableFormBuilder);
  service = inject(FilmService);
  adminService = inject(AdminFilmService);

  screen$ = this.service.getScreens();
  today!: Date;
  minimumDay!: string[];
  dateArray!: (number | Date)[];
  showForm = this.createShowForm();
  data!: showformInput;
  private createShowForm() {
    const form = this.formBuilder.group({
      date: this.formBuilder.control('', []),
      sala: this.formBuilder.control<number>(NaN, []),

      // ]),
      // godzina: this.formBuilder.control('',[

      // ]),
      // description: this.formBuilder.control('',[

      // ]),
      // genre: this.formBuilder.control('',[

      // ]),
      // ageRest: this.formBuilder.control('',[

      // ]),
      // date: this.formBuilder.control('',[

      // ]),
      // hour: this.formBuilder.control('',[

      // ]),
      // length: this.formBuilder.control('',[

      // ]),
      // score: this.formBuilder.control('',[

      // ]),
      // premier: this.formBuilder.control('',[

      // ])
    });
    return form;
  }
  dateCreator() {
    let array = [];
    this.today = new Date();
    array.push(this.today);
    return array.map((today: number | Date) => format(today, 'yyyy-MM-dd'));
    console.log(array);
  }
  submit() {
    this.showForm.markAllAsTouched();
    if (this.showForm.invalid) {
      return;
    }
    this.data = this.showForm.getRawValue();
  }
  ngOnInit(): void {
    // this.today = new Date().dateArray.push()toDateString().map((today: number | Date) => format(today, 'yyyy-MM-dd'));

    this.minimumDay = this.dateCreator();
  }
}
