import { Component, inject, Input, OnInit } from '@angular/core';
import { Cart } from '../../../../../test/cart-interface';
import { CartService } from '../../../../../test/cart.service';
import { Showtest } from '../../../../../test/test.component';
import { NgFor } from '@angular/common';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-type-form [show][cart]',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule],
  templateUrl: './ticket-type-form.component.html',
  styleUrls: ['./ticket-type-form.component.scss'],
})
export class TicketTypeFormComponent implements OnInit {
  cartService = inject(CartService);

  @Input() show!: Showtest;
  @Input() cart!: Cart;
  selectedTicket = '';
  ticketTypeChange(id: string, type: string, price: number) {
    this.cartService.updateSeatTypeAndPrice(id, type, price);
    this.cartService.cart$.subscribe(console.log);
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
