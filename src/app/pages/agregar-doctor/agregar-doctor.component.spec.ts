import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDoctorComponent } from './agregar-doctor.component';

describe('AgregarDoctorComponent', () => {
  let component: AgregarDoctorComponent;
  let fixture: ComponentFixture<AgregarDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
