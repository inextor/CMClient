import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoPolizaComponent } from './agregar-tipo-poliza.component';

describe('AgregarTipoPolizaComponent', () => {
  let component: AgregarTipoPolizaComponent;
  let fixture: ComponentFixture<AgregarTipoPolizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoPolizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
