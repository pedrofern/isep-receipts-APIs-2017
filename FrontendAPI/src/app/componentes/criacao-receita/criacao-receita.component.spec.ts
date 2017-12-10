import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoReceitaComponent } from './criacao-receita.component';

describe('CriacaoReceitaComponent', () => {
  let component: CriacaoReceitaComponent;
  let fixture: ComponentFixture<CriacaoReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriacaoReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
