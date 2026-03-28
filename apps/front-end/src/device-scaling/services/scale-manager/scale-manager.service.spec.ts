import { TestBed } from '@angular/core/testing';

import { ScaleManagerService } from './scale-manager.service';

describe('ScaleManagerService', () => {
  let service: ScaleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
