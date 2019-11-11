import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenarHistoriaClinicaComponent } from './llenar-historia-clinica.component';

describe('LlenarHistoriaClinicaComponent', () => {
  let component: LlenarHistoriaClinicaComponent;
  let fixture: ComponentFixture<LlenarHistoriaClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenarHistoriaClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
