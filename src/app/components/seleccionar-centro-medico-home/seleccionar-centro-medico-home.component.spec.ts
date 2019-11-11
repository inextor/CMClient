import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCentroMedicoHomeComponent } from './seleccionar-centro-medico-home.component';

describe('SeleccionarCentroMedicoHomeComponent', () => {
  let component: SeleccionarCentroMedicoHomeComponent;
  let fixture: ComponentFixture<SeleccionarCentroMedicoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarCentroMedicoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCentroMedicoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
