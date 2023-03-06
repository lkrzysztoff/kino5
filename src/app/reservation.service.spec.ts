import { TestBed } from '@angular/core/testing';

import { ReservationService } from './features/home/subpages/reservation/reservation-service/reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
