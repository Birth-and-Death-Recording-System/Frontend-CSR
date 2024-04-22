import { TestBed } from '@angular/core/testing';

import { PageTitleService } from './page-title-service.service';

describe('PageTitleServiceService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
