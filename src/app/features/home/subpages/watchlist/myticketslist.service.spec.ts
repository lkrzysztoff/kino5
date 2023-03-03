import { TestBed } from '@angular/core/testing';

import { MyticketslistService } from './myticketslist.service';

describe('MyticketslistService', () => {
  let service: MyticketslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyticketslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
