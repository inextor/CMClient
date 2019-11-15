import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRecepcionistaComponent } from './agregar-recepcionista.component';

describe('AgregarRecepcionistaComponent', () => {
  let component: AgregarRecepcionistaComponent;
  let fixture: ComponentFixture<AgregarRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
