import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesComponent } from './especialidades.component';

import { from } from 'rxjs';
describe('EspecialidadesComponent', () => {
  let component: EspecialidadesComponent;
  let fixture: ComponentFixture<EspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
