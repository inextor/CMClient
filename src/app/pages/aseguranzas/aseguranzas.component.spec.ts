import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguranzasComponent } from './aseguranzas.component';

describe('AseguranzasComponent', () => {
  let component: AseguranzasComponent;
  let fixture: ComponentFixture<AseguranzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AseguranzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguranzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
