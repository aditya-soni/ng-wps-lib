import { TestBed } from '@angular/core/testing';

import { NgWpsLibService } from './ng-wps-lib.service';

describe('NgWpsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgWpsLibService = TestBed.get(NgWpsLibService);
    expect(service).toBeTruthy();
  });
});
