import { TestBed } from '@angular/core/testing';

import { FizzyService } from './fizzy.service';

describe('FizzyService', () => {
  let service: FizzyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FizzyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
