import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModelModule } from "./model/model.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DatePanelComponent } from './date-panel/date-panel.component';
import { FormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    SigninComponent,
    HeaderComponent,
    CardComponent,
    FooterComponent,
    ReservationComponent,
    DatePanelComponent,
  ],
  imports: [
    ModelModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface userPosts {
  posts: [
  id: number,
  title: string,
  author: string
  ]

}
