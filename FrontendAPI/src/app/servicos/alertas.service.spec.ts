import { TestBed, inject } from '@angular/core/testing';

import { AlertasService } from '../alertas.service';

describe('AlertasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertasService]
    });
  });

  it('should be created', inject([AlertasService], (service: AlertasService) => {
    expect(service).toBeTruthy();
  }));
});
