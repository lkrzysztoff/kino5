import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminpageComponent } from './pages/admin-page/adminpage.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/store/auth.effects';
import { NumberMaxLengthDirective } from 'src/app/shared/guards/directives/numbermaxlength.directive';
import { AdminEffects } from './store/admin.effects';
import { addFilmReducer } from './store/admin.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { collectionReducer } from './store/collection.reducer';
import { showsReducer } from './store/shows.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'adminpage',
            component: AdminpageComponent,
          },
        ],
      },
    ]),
    StoreModule.forFeature('AdminFilm', [addFilmReducer]),
  ],
})
export default class AdminModule {}
