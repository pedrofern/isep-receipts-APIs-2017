import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarReceitaComponent } from './pesquisar-receita.component';

describe('PesquisarReceitaComponent', () => {
  let component: PesquisarReceitaComponent;
  let fixture: ComponentFixture<PesquisarReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
