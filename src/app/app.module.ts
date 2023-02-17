import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModelModule } from "./model/model.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './shared/ui/orders/order/order.component';
import { SigninComponent } from './auth/signin/signin.component';
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
import { CardPanelBodyComponent } from './shared/pages/card-panel-body/card-panel-body.component';










@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    SigninComponent,
    HeaderComponent,
    CardComponent,
    FooterComponent,
    OrderCompletedComponent,
    OrderDetailsComponent,
    QrCodePageComponent,
    OrderGeneratedComponent,
    DatePanelComponent,
    CardPanelBodyComponent
  
    
  ],
  imports: [
    ModelModule,
    BrowserModule,
    AppRoutingModule,
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
