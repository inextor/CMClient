import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoPrecioComponent } from './agregar-tipo-precio.component';

describe('AgregarTipoPrecioComponent', () => {
  let component: AgregarTipoPrecioComponent;
  let fixture: ComponentFixture<AgregarTipoPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
