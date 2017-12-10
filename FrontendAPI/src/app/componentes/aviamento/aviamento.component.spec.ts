import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviamentoComponent } from './aviamento.component';

describe('AviamentoComponent', () => {
  let component: AviamentoComponent;
  let fixture: ComponentFixture<AviamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
