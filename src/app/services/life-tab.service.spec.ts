import { TestBed } from '@angular/core/testing';

import { LifeTabService } from './life-tab.service';

describe('LifeTabService', () => {
  let service: LifeTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
