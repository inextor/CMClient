import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCitasDoctorComponent } from './calendario-citas-doctor.component';

describe('CalendarioCitasDoctorComponent', () => {
  let component: CalendarioCitasDoctorComponent;
  let fixture: ComponentFixture<CalendarioCitasDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioCitasDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioCitasDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
