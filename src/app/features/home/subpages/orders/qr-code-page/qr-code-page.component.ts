import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss'],
})
export class QrCodePageComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)
  constructor(private router: Router) {}
  orderId !: number
  ngOnInit(): void {
    this.orderId = this.activeRoute.snapshot.params['orderId']
  }
}
