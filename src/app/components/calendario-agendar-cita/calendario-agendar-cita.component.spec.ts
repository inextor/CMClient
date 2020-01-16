import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAgendarCitaComponent } from './calendario-agendar-cita.component';

describe('CalendarioAgendarCitaComponent', () => {
  let component: CalendarioAgendarCitaComponent;
  let fixture: ComponentFixture<CalendarioAgendarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioAgendarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioAgendarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
