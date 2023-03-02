import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModelModule } from "./model/model.module";
import { AppComponent } from './app.component';
import { OrderComponent } from './shared/ui/orders/order/order.component';
import { HeaderComponent } from './shared/ui/components/header/header.component';
import { CardComponent } from './shared/ui/movies/card/card.component';
import { FooterComponent } from './shared/ui/components/footer/footer.component';
import { ReservationComponent } from './shared/pages/reservation/reservation.component';
import { DatePanelComponent } from './shared/ui/components/date-panel/date-panel.component';
import { FormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldModule, MatError, MatHint} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { OrderCompletedComponent } from './shared/ui/orders/order-completed/order-completed.component';
import { OrderDetailsComponent } from './shared/ui/orders/order-details/order-details.component';
import { QrCodePageComponent } from './shared/ui/orders/qr-code-page/qr-code-page.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCard, MatCardModule} from '@angular/material/card';
import { OrderGeneratedComponent } from './shared/ui/orders/order-generated/order-generated.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { UserState } from './core/store/user.interfaces';
import { AuthComponent } from './features/auth';
import { CookieService } from 'ngx-cookie-service';
// import { TokenInterceptorProvider } from './shared/interceptors/token.interceptor';
import { SigninComponent } from './features/auth/subpages/signin/signin.component';
import { userReducer } from './core/store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './core/store/user.effects';
import { API_URL } from './core/env.token';
import { environment } from 'src/enviroment';
import { AuthEffects } from './features/auth/store/auth.effects';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { FavlistComponent } from './shared/pages/favlist/favlist.component';
import { MyticketsComponent } from './shared/pages/mytickets/mytickets.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/pages/homepage/homepage.component';

import { CheckGuard } from './shared/guards/check.guard';
import { OnDestroy } from '@angular/core';
import { AdminComponent } from './features/admin/admin.component';
import { AdminpageComponent } from './features/admin/pages/adminpage/adminpage.component';
import { RoleUserGuard } from './shared/guards/roleUser.guard';
import { RoleAdminGuard } from './shared/guards/roleAdmin.guard';
import { AddmoviesadminComponent } from './addmoviesadmin/addmoviesadmin.component';
import { NgModel } from '@angular/forms';
import { ScoredialogComponent } from './shared/ui/movies/card/scoredialog/scoredialog.component';
import { AddshowsadminComponent } from './addshowsadmin/addshowsadmin.component';
import { ShowformComponent } from './addshowsadmin/showform/showform.component';
import { NumberMaxLengthDirective } from './shared/guards/directives/numbermaxlength.directive';
import { TestComponent } from './test/test.component';









export interface AppState {
  user: UserState;
}




@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    HeaderComponent,
    CardComponent,
    FooterComponent,
    OrderCompletedComponent,
    OrderDetailsComponent,
    QrCodePageComponent,
    OrderGeneratedComponent,
    DatePanelComponent,
    HomeComponent,
    AuthComponent,
    FavlistComponent,
    MyticketsComponent,
    HomePageComponent,
    AdminComponent,
    AdminpageComponent,
    AddmoviesadminComponent,
    ScoredialogComponent,
    AddshowsadminComponent,
    ShowformComponent,
    NumberMaxLengthDirective,
    TestComponent
    
  
    
  ],
  imports: [
    ModelModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    StoreModule.forRoot({user:userReducer}),
    EffectsModule.forRoot([UserEffects]),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            canActivate:[RoleUserGuard],
            loadChildren: () => import('src/app/shared/pages/home/home.module'),
          },
          {
            path: 'auth',
            canActivate:[CheckGuard],
            loadChildren: () => import('src/app/features/auth/auth.module'),
          },
          {
            path: 'admin',
            canActivate:[RoleAdminGuard],
            loadChildren: () => import('src/app/features/admin/admin.module'),
          },
          // {
          //   path: '**',
          //   redirectTo: '',
          // },
        ],
      },
    ]),
   
    



  ],
  providers: [CookieService,
    {
      provide:API_URL,
      useValue:environment.API_URL,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule  { }

export interface userPosts {

  posts: [
  id: number,
  title: string,
  author: string
  ]
  
}
