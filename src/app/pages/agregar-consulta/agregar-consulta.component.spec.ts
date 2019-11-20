import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConsultaComponent } from './agregar-consulta.component';

describe('AgregarConsultaComponent', () => {
  let component: AgregarConsultaComponent;
  let fixture: ComponentFixture<AgregarConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
