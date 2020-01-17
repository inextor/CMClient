import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoVentaConsultaComponent } from './punto-venta-consulta.component';

describe('PuntoVentaConsultaComponent', () => {
  let component: PuntoVentaConsultaComponent;
  let fixture: ComponentFixture<PuntoVentaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoVentaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoVentaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
