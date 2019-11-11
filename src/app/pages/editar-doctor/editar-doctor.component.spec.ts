import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDoctorComponent } from './editar-doctor.component';

describe('EditarDoctorComponent', () => {
  let component: EditarDoctorComponent;
  let fixture: ComponentFixture<EditarDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
