import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDoctorComponent } from './horario-doctor.component';

describe('HorarioDoctorComponent', () => {
  let component: HorarioDoctorComponent;
  let fixture: ComponentFixture<HorarioDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
