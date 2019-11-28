import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRequisicionComponent } from './agregar-requisicion.component';

describe('AgregarRequisicionComponent', () => {
  let component: AgregarRequisicionComponent;
  let fixture: ComponentFixture<AgregarRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
