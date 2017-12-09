import { TestBed, inject } from '@angular/core/testing';

import { EmitterServiceService } from './emitter-service.service';

describe('EmitterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitterServiceService]
    });
  });

  it('should be created', inject([EmitterServiceService], (service: EmitterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
