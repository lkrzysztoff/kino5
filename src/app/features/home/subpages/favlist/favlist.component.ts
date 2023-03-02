import { Component, inject } from '@angular/core';
import { MyfavlistService } from './myfavlist.service';

@Component({
  selector: 'app-favlist',
  templateUrl: './favlist.component.html',
  styleUrls: ['./favlist.component.scss']
})
export class FavlistComponent {
count$ = inject(MyfavlistService).favList$;
service = inject ( MyfavlistService)


}
