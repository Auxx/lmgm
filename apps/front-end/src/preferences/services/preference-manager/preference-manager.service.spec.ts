import { TestBed } from '@angular/core/testing';

import { PreferenceManagerService } from './preference-manager.service';

describe('PreferenceManagerService', () => {
  let service: PreferenceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferenceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
