import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirRequisicionComponent } from './recibir-requisicion.component';

describe('RecibirRequisicionComponent', () => {
  let component: RecibirRequisicionComponent;
  let fixture: ComponentFixture<RecibirRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibirRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibirRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
