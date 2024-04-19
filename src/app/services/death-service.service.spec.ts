import { TestBed } from '@angular/core/testing';

import { DeathService } from './death-service.service';

describe('DeathServiceService', () => {
  let service: DeathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
