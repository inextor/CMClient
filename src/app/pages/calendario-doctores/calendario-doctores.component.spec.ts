import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioDoctoresComponent } from './calendario-doctores.component';

describe('CalendarioDoctoresComponent', () => {
  let component: CalendarioDoctoresComponent;
  let fixture: ComponentFixture<CalendarioDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
