import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminpageComponent } from './pages/admin-page/adminpage.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/store/auth.effects';
import { NumberMaxLengthDirective } from 'src/app/shared/guards/directives/numbermaxlength.directive';

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects]),
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
  ],
})
export default class AdminModule {}
