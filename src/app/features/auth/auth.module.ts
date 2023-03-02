import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects'

import { AuthEffects } from 'src/app/features/auth/store/auth.effects'
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { AUTH_PATHS } from './auth-paths';
import { SigninComponent } from './subpages/signin/signin.component';



@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'signin',
            component: SigninComponent
          },
        ]
      }
    ]),
  ],
})
export default class AuthModule {}