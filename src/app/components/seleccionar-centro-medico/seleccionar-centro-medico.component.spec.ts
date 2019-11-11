import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCentroMedicoComponent } from './seleccionar-centro-medico.component';

describe('SeleccionarCentroMedicoComponent', () => {
  let component: SeleccionarCentroMedicoComponent;
  let fixture: ComponentFixture<SeleccionarCentroMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarCentroMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCentroMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
