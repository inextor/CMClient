import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPreciosComponent } from './editar-precios.component';

describe('EditarPreciosComponent', () => {
  let component: EditarPreciosComponent;
  let fixture: ComponentFixture<EditarPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
