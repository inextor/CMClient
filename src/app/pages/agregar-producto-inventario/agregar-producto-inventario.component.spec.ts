import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoInventarioComponent } from './agregar-producto-inventario.component';

describe('AgregarProductoInventarioComponent', () => {
  let component: AgregarProductoInventarioComponent;
  let fixture: ComponentFixture<AgregarProductoInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProductoInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
