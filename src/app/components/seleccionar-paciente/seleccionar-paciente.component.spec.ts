import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPacienteComponent } from './seleccionar-paciente.component';

describe('SeleccionarPacienteComponent', () => {
  let component: SeleccionarPacienteComponent;
  let fixture: ComponentFixture<SeleccionarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
