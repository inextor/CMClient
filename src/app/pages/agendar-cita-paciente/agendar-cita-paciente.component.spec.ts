import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaPacienteComponent } from './agendar-cita-paciente.component';

describe('AgendarCitaPacienteComponent', () => {
  let component: AgendarCitaPacienteComponent;
  let fixture: ComponentFixture<AgendarCitaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarCitaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarCitaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
