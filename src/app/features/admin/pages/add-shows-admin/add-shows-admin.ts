import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MainDataSource } from '../../../../model/main.datasource.service';
import { showformInput } from './showform/showform.interface';

@Component({
  selector: 'app-addshowsadmin',
  templateUrl: './add-shows-admin.component.html',
  styleUrls: ['./add-shows-admin.scss'],
})
export class AddshowsadminComponent {
  formBuilder = inject(NonNullableFormBuilder);
  service = inject(MainDataSource);

  screen$ = this.service.getScreens();

  showForm = this.createShowForm();
  data!: showformInput;
  private createShowForm() {
    const form = this.formBuilder.group({
      date: this.formBuilder.control('', []),
      sala: this.formBuilder.control('', []),

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

  submit() {
    this.showForm.markAllAsTouched();
    if (this.showForm.invalid) {
      return;
    }
    this.data = this.showForm.getRawValue();
  }
}
