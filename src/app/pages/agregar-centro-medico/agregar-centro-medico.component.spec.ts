import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCentroMedicoComponent } from './agregar-centro-medico.component';

describe('AgregarCentroMedicoComponent', () => {
  let component: AgregarCentroMedicoComponent;
  let fixture: ComponentFixture<AgregarCentroMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCentroMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCentroMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
