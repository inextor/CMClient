import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDoctorComponent } from './ver-doctor.component';

describe('VerDoctorComponent', () => {
  let component: VerDoctorComponent;
  let fixture: ComponentFixture<VerDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
