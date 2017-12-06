import { TestBed, inject } from '@angular/core/testing';

import { ReceitaService } from './receita.service';

describe('ReceitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceitaService]
    });
  });

  it('should be created', inject([ReceitaService], (service: ReceitaService) => {
    expect(service).toBeTruthy();
  }));
});
