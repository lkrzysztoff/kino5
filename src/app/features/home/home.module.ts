import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './subpages/orders/order/order.component';
import { SigninComponent } from 'src/app/features/auth/subpages/signin/signin.component';
import { AppComponent } from 'src/app/app.component';
import { ReservationComponent } from './subpages/reservation/reservation.component';
import { CardComponent } from './subpages/movies/card/card.component';
import { ModelResolver } from 'src/app/model/model.resolver';
import { OrderCompletedComponent } from './subpages/orders/order-completed/order-completed.component';
import { QrCodePageComponent } from './subpages/orders/qr-code-page/qr-code-page.component';
import { HomeComponent } from './home.component';
import { DatePanelComponent } from '../../shared/ui-components/date-panel/date-panel.component';
import { MyticketsComponent } from './subpages/watchlist/mytickets.component';
import { Order } from 'src/app/model/order.model';
import { OrderGeneratedComponent } from './subpages/orders/order-generated/order-generated.component';
import { HomePageComponent } from './subpages/home-page/homepage.component';
import { FavlistComponent } from './subpages/favlist/favlist.component';
import { UnloggedGuard } from '../../shared/guards/unloggedGuard';
import { RoleUserGuard } from '../../shared/guards/roleUser.guard';
import { FormsModule } from '@angular/forms';

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
            pathMatch: 'full',
          },
          {
            path: 'favlist',
            canActivate: [UnloggedGuard],
            component: FavlistComponent,
          },
          {
            path: 'tickets',

            component: MyticketsComponent,
          },
        ],
      },
      // path: 'reservation/:selectedDate/:showId',
      {
        path: 'reservation/:selectedDate/:showId',
        // path: 'reservation/:selectedDate',
        component: ReservationComponent,
        resolve: { model: ModelResolver },
      },
      { path: 'order', component: OrderComponent },
      {
        path: 'order-completed',
        component: OrderCompletedComponent,
      },
      { path: 'qrcode', component: QrCodePageComponent },
      {
        path: 'orderg',
        component: OrderGeneratedComponent,
      },
      {
        path: 'favlist',
        component: FavlistComponent,
      },
      {
        path: 'mytickets',
        component: MyticketsComponent,
      },
    ]),
  ],
})
export default class HomeModule {}
