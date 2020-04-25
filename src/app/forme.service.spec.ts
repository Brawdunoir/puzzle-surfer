import { TestBed } from '@angular/core/testing';

import { FormeService } from './forme.service';

describe('FormeService', () => {
  let service: FormeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
