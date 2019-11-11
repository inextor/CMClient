import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarPreguntasComponent } from './configurar-preguntas.component';

describe('ConfigurarPreguntasComponent', () => {
  let component: ConfigurarPreguntasComponent;
  let fixture: ComponentFixture<ConfigurarPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
