import { Component, inject, Input, OnInit } from '@angular/core';
import { Cart } from '../../../../../shared/interfaces/cart-interface';
import { CartService } from '../../../../../shared/services/cart.service';
import { Showtest } from '../reservation-grid/reservation-interfaces';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ticket-type-form [show][cart]',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule, MatCardModule],
  templateUrl: './ticket-type-form.component.html',
  styleUrls: ['./ticket-type-form.component.scss'],
})
export class TicketTypeFormComponent implements OnInit {
  @Input() show!: Showtest;
  @Input() cart!: Cart;

  cartService = inject(CartService);
  selectedTicket = '';
  ticketTypeChange(id: string, type: string, price: number) {
    this.cartService.updateSeatTypeAndPrice(id, type, price);
  }

  ticketPriceChange(selectedTicket: string) {
    let price = 0;
    this.show.priceList.forEach((ticket) => {
      if (ticket.type === selectedTicket) {
        if (price) {
          price = ticket.price;
        } else {
          price = ticket.price;
        }
      }
    });
    return price;
  }

  ngOnInit() {
    this.selectedTicket = this.cart.seat.type;
  }
}
