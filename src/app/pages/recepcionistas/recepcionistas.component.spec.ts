import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistasComponent } from './recepcionistas.component';

describe('RecepcionistasComponent', () => {
  let component: RecepcionistasComponent;
  let fixture: ComponentFixture<RecepcionistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
