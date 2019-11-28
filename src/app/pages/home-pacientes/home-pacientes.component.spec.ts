import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePacientesComponent } from './home-pacientes.component';

describe('HomePacientesComponent', () => {
  let component: HomePacientesComponent;
  let fixture: ComponentFixture<HomePacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
