import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPacienteComponent } from './citas-paciente.component';

describe('CitasPacienteComponent', () => {
  let component: CitasPacienteComponent;
  let fixture: ComponentFixture<CitasPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
