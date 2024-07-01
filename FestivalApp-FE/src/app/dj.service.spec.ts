import { TestBed } from '@angular/core/testing';

import { DjService } from './dj.service';

describe('DJService', () => {
  let service: DjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
