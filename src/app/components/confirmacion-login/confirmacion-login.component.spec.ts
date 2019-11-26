import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionLoginComponent } from './confirmacion-login.component';

describe('ConfirmacionLoginComponent', () => {
  let component: ConfirmacionLoginComponent;
  let fixture: ComponentFixture<ConfirmacionLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
