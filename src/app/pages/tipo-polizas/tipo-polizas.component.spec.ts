import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPolizasComponent } from './tipo-polizas.component';

describe('TipoPolizasComponent', () => {
  let component: TipoPolizasComponent;
  let fixture: ComponentFixture<TipoPolizasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPolizasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
