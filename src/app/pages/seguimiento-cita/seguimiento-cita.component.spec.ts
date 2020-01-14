import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoCitaComponent } from './seguimiento-cita.component';

describe('SeguimientoCitaComponent', () => {
  let component: SeguimientoCitaComponent;
  let fixture: ComponentFixture<SeguimientoCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
