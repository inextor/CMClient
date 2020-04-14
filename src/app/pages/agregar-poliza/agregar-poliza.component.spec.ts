import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPolizaComponent } from './agregar-poliza.component';

describe('AgregarPolizaComponent', () => {
  let component: AgregarPolizaComponent;
  let fixture: ComponentFixture<AgregarPolizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPolizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
