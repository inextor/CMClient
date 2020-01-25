import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCitasDoctoresComponent } from './view-citas-doctores.component';

describe('ViewCitasDoctoresComponent', () => {
  let component: ViewCitasDoctoresComponent;
  let fixture: ComponentFixture<ViewCitasDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCitasDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCitasDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
