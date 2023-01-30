import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { SigninComponent } from './signin/signin.component';
import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CardComponent } from './card/card.component';
import { ModelResolver } from "./model/model.resolver";



const routes: Routes = [
  { path: ''           ,  component: CardComponent},
  { path: 'signin'     , component: SigninComponent },
  { path: 'card/:selectedDate'   , component : CardComponent},
  { path: 'card'   , component : CardComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'reservation/:selectedDate/:showId', component: ReservationComponent,resolve: { model: ModelResolver } },
  { path: 'order'      , component: OrderComponent},
  { path: "**"         , redirectTo: "/card" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  krzys : boolean = true;
 }
