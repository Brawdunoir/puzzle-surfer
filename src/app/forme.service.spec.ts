import { TestBed } from '@angular/core/testing';

import { FormeService } from './forme.service';

describe('FormeService', () => {
  let service: FormeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormeService);
  });

  it('jumps should match positions', () => {
    service.formes.forEach(forme => {
      forme.positions.forEach(position => {
        const jump = service.dim * position.y + position.x;
        expect(forme.jumps).toContain(jump);
      });
    });
  });
});
