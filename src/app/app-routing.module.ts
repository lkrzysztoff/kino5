// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { OrderComponent } from './shared/ui/orders/order/order.component';
// import { SigninComponent } from './features/auth/subpages/signin/signin.component';
// import { AppComponent } from './app.component';
// import { ReservationComponent } from './shared/pages/reservation/reservation.component';
// import { CardComponent } from './shared/ui/movies/card/card.component';
// import { ModelResolver } from "./model/model.resolver";
// import { OrderCompletedComponent } from './shared/ui/orders/order-completed/order-completed.component';
// import { QrCodePageComponent } from './shared/ui/orders/qr-code-page/qr-code-page.component';
// import { OrderGeneratedComponent } from './shared/ui/orders/order-generated/order-generated.component';
// import { HomeComponent } from './shared/pages/home/home.component';
// import { DatePanelComponent } from './shared/ui/components/date-panel/date-panel.component';
// import { WatchlistComponent } from './shared/pages/watchlist/watchlist.component';
// import { MyticketsComponent } from './shared/pages/mytickets/mytickets.component';
// import { HomePageComponent } from './shared/pages/homepage/homepage.component';

// const routes: Routes = [
//   { path: ''           ,  component: HomePageComponent},
//   { path: 'signin'     , component: SigninComponent },
//   { path: 'homepage/:selectedDate'   , component : HomePageComponent},
//   { path: 'card'   , component : HomePageComponent},
//   { path: 'reservation', component: ReservationComponent},
//   { path: 'reservation/:selectedDate/:showId', component: ReservationComponent,resolve: { model: ModelResolver } },
//   { path: 'order'      , component: OrderComponent,},
//   { path: 'order-completed'      , component: OrderCompletedComponent,},
//   { path: 'qrcode' , component: QrCodePageComponent},
//   {path:'orderg', component: OrderGeneratedComponent},
//   {path:'watchlist', component: WatchlistComponent },
//   {path:'mytickets', component: MyticketsComponent},
//   { path: "**"         , redirectTo: "" },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
//   krzys : boolean = true;
//  }
