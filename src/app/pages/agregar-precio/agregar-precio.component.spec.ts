import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrecioComponent } from './agregar-precio.component';

describe('AgregarPrecioComponent', () => {
  let component: AgregarPrecioComponent;
  let fixture: ComponentFixture<AgregarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
