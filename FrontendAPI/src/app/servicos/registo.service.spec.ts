import { TestBed, inject } from '@angular/core/testing';

import { RegistoServiceService } from './registo-service.service';

describe('RegistoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistoServiceService]
    });
  });

  it('should be created', inject([RegistoServiceService], (service: RegistoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
