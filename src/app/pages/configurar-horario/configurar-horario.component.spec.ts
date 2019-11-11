import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarHorarioComponent } from './configurar-horario.component';

describe('ConfigurarHorarioComponent', () => {
  let component: ConfigurarHorarioComponent;
  let fixture: ComponentFixture<ConfigurarHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
