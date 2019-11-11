import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDoctorComponent } from './seleccionar-doctor.component';

describe('SeleccionarDoctorComponent', () => {
  let component: SeleccionarDoctorComponent;
  let fixture: ComponentFixture<SeleccionarDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
