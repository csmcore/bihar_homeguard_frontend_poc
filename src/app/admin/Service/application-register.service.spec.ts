import { TestBed } from '@angular/core/testing';

import { ApplicationRegisterService } from './application-register.service';

describe('ApplicationRegisterService', () => {
  let service: ApplicationRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
