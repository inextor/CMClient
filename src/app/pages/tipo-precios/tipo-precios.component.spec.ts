import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPreciosComponent } from './tipo-precios.component';

describe('TipoPreciosComponent', () => {
  let component: TipoPreciosComponent;
  let fixture: ComponentFixture<TipoPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
