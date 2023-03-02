import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from '../../ui/orders/order/order.component';
import { SigninComponent } from 'src/app/features/auth/subpages/signin/signin.component';
import { AppComponent } from 'src/app/app.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { CardComponent } from '../../ui/movies/card/card.component';
import { ModelResolver } from 'src/app/model/model.resolver';
import { OrderCompletedComponent } from '../../ui/orders/order-completed/order-completed.component';
import { QrCodePageComponent } from '../../ui/orders/qr-code-page/qr-code-page.component';
import { HomeComponent } from './home.component';
import { DatePanelComponent } from '../../ui/components/date-panel/date-panel.component';
import { MyticketsComponent } from '../mytickets/mytickets.component';import { Order } from 'src/app/model/order.model';
import { OrderGeneratedComponent } from '../../ui/orders/order-generated/order-generated.component';
import { HomePageComponent } from '../homepage/homepage.component';
import { FavlistComponent } from '../favlist/favlist.component';
import { UnloggedGuard } from '../../guards/unloggedGuard';
import { RoleUserGuard } from '../../guards/roleUser.guard';
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
              canActivate:[UnloggedGuard],
              component: FavlistComponent
            },
            {
              path: 'tickets',
            
              component: MyticketsComponent
            }
          ],
        },
        {
            path: 'reservation/:selectedDate/:showId',
            component: ReservationComponent,
            resolve: { model: ModelResolver } 
        },
        {   path: 'order',
            component: OrderComponent,
        },
        {  
            path: 'order-completed', 
            component: OrderCompletedComponent,
        },
        { path: 'qrcode' ,
         component: QrCodePageComponent
        },
        {
            path:'orderg', component: OrderGeneratedComponent
        },
        {
            path:'favlist', component: FavlistComponent 
        },
        {
            path:'mytickets', component: MyticketsComponent
        },
    
    ]),
],
})
    export default class HomeModule {}