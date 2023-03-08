import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mytickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyticketsComponent implements OnInit {
  @Output() orderDataExport = new EventEmitter();

  private http = inject(HttpClient);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.newOrders$ = this.newGetOrders();
    let orders = this.activeRoute.snapshot.params['orders'];
  }

  orderDataExportActivate(orderData: { value: Cart }) {
    this.orderDataExport.emit(orderData);
  }

  filterForObjects(orderHistory: { value: Cart }[]) {
    return;
  }

  getId(value: { value: Cart }) {
    return Object.values(value).length - 1;
  }

  returnIdByObject(value: { value: Cart }, arrayLength: number) {
    return Object.values(value)[arrayLength];
  }

  newGetOrders() {
    return this.http.get<{ value: Cart; id: number }[]>(
      'http://localhost:3000/orders'
    );
  }
  newOrders$!: Observable<{ value: Cart }[]>;
}
