import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaInnerComponent } from './agendar-cita-inner.component';

describe('AgendarCitaInnerComponent', () => {
  let component: AgendarCitaInnerComponent;
  let fixture: ComponentFixture<AgendarCitaInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarCitaInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarCitaInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
