import { Component, OnInit } from '@angular/core';
import { Cart } from "../model/cart.model";
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
faVideo = faVideo;
faShoppingCart = faShoppingCart;
  constructor( public cart : Cart) { }

  ngOnInit(): void {
  }

}
