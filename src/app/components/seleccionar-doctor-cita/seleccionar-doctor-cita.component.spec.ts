import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDoctorCitaComponent } from './seleccionar-doctor-cita.component';

describe('SeleccionarDoctorCitaComponent', () => {
  let component: SeleccionarDoctorCitaComponent;
  let fixture: ComponentFixture<SeleccionarDoctorCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarDoctorCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarDoctorCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
