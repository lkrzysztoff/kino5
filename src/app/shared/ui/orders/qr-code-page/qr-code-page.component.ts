import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss']
})
export class QrCodePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
