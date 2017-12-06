import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPesquisaComponent } from './medic-pesquisa.component';

describe('MedicPesquisaComponent', () => {
  let component: MedicPesquisaComponent;
  let fixture: ComponentFixture<MedicPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
