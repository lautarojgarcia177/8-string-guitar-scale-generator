import { TestBed } from '@angular/core/testing';

import { GuitarScalesService } from './guitar-scales.service';

describe('GuitarScalesService', () => {
  let service: GuitarScalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuitarScalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
