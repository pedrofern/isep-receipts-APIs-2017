import { TestBed, inject } from '@angular/core/testing';

import { FabricaReceitasService } from './fabrica-receitas.service';

describe('FabricaReceitasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FabricaReceitasService]
    });
  });

  it('should be created', inject([FabricaReceitasService], (service: FabricaReceitasService) => {
    expect(service).toBeTruthy();
  }));
});
