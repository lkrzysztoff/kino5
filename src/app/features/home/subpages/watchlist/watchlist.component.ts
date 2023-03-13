import { Component, inject } from '@angular/core';
import { MywatchlistService } from './watchlist-service/mywatchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent {
  count$ = inject(MywatchlistService).favList$;
  service = inject(MywatchlistService);
}
