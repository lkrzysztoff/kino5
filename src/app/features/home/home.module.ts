import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './subpages/orders/order/order.component';
import { ReservationComponent } from './subpages/reservation/reservation.component';
import { OrderCompletedComponent } from './subpages/orders/order-completed/order-completed.component';
import { QrCodePageComponent } from './subpages/orders/qr-code-page/qr-code-page.component';
import { HomeComponent } from './home.component';
import { MyticketsComponent } from './subpages/my-tickets-history/my-tickets.component';
import { OrderGeneratedComponent } from './subpages/orders/order-generated/order-generated.component';
import { HomePageComponent } from './subpages/home-page/homepage.component';
import { WatchlistComponent } from './subpages/watchlist/watchlist.component';
import { UnloggedGuard } from '../../shared/guards/unloggedGuard';
import { OrderGuard } from 'src/app/shared/guards/order-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: HomePageComponent,
            children:[
              {
                path: 'home/:selectedDate',
                component: HomePageComponent,
               
              },
            ]
           
          },
          {
            path: 'watchlist',
            canActivate: [UnloggedGuard],
            component: WatchlistComponent,
          },
          {
            path: 'tickets',
            canActivate: [UnloggedGuard],
            component: MyticketsComponent,
          },
        ],
      },
      {
        // path: 'reservation/:selectedDate/:showId',
        path: 'reservation/:selectedDate/:showId',
        // path: 'reservation',
        component: ReservationComponent
      },
      { path: 'order', canActivate: [OrderGuard], component: OrderComponent },
      {
        path: 'order-completed',
        canActivate: [OrderGuard],
        component: OrderCompletedComponent,
      },
      { path: 'qrcode/:orderId', component: QrCodePageComponent },
      {
        path: 'order-generated/:orderId',
        component: OrderGeneratedComponent,
      },
    ]),
  ],
})
export default class HomeModule {}
