import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCitasComponent } from './control-citas.component';

describe('ControlCitasComponent', () => {
  let component: ControlCitasComponent;
  let fixture: ComponentFixture<ControlCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
